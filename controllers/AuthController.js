const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const { httpResponse } = require("../utils/httpResponse");

const User = require("../models/user");

module.exports.register = async (req, res) => {
    try {
        let password = req.body.password;
        const salt = await bcrypt.genSalt(10);
        req.body.password = await bcrypt.hash(password, salt);

        let userObj = {
            firstName: req.body.firstName,
            lastName: req.body.lastName,
            email: req.body.email,
            phone: req.body.phone,
            dob: req.body.dob,
            password: req.body.password,
            role: req.body.role,
        };

        const user = await User.create(req.body);
        res.status(201).json(
            httpResponse("success", user, "User created successfully!")
        );
    } catch (error) {
        res.status(500).json(httpResponse("fail", {}, "User can't created"));
    }
};

module.exports.login = async (req, res) => {
    let phone = req.body.phone;
    let password = req.body.password;

    const user = await User.findOne({ phone });
    if (user) {
        // check user password with hashed password stored in the database

        const validPassword = await bcrypt.compare(password, user.password);

        if (validPassword) {
            const userJwtData = {
                userName: user.userName,
                firstName: user.firstName,
                lastName: user.lastName,
                role: user.role,
                email: user.email,
                id: user._id,
            };

            const accessToken = jwt.sign(
                userJwtData,
                process.env.ACCESS_TOKEN_SECRET,
                {
                    expiresIn: "360m",
                }
            );

            const refreshToken = jwt.sign(
                userJwtData,
                process.env.REFRESH_TOKEN_SECRET,
                {
                    expiresIn: "1d",
                }
            );

            res.cookie("tokenExp", "1", {
                sameSite: "strict",
                secure: true,
                path: "/",
                expires: new Date(new Date().getTime() + 2 * 60 * 60 * 1000),
            });

            res.cookie("token", accessToken, {
                httpOnly: true,
                sameSite: "strict",
                secure: true,
                path: "/",
                expires: new Date(new Date().getTime() + 2 * 60 * 60 * 1000),
            });

            res.cookie("refreshToken", refreshToken, {
                httpOnly: true,
                sameSite: "strict",
                secure: true,
                path: "/",
                expires: new Date(new Date().getTime() + 12 * 60 * 60 * 1000),
            });

            res.cookie("userId", user._id, {
                sameSite: "strict",
                secure: true,
                path: "/",
                expires: new Date(new Date().getTime() + 12 * 60 * 60 * 1000),
            });

            res.cookie("role", user.role, {
                sameSite: "strict",
                secure: true,
                path: "/",
                expires: new Date(new Date().getTime() + 12 * 60 * 60 * 1000),
            });

            user.password = undefined;
            const newUser = user;
            res.status(200).json(
                httpResponse("success", newUser, "Successfully logged in.")
            );
        } else {
            res.status(400).json(httpResponse("fail", {}, "Invalid password."));
        }
    } else {
        res.status(401).json(httpResponse("fail", {}, "User does not exist."));
    }
};

module.exports.logout = async (req, res) => {
    try {
        res.clearCookie("token", "", {
            httpOnly: true,
            sameSite: "strict",
            secure: true,
            path: "/",
        });

        res.clearCookie("refreshToken", "", {
            httpOnly: true,
            sameSite: "strict",
            secure: true,
            path: "/",
        });
        res.clearCookie("tokenExp", "", {
            sameSite: "strict",
            secure: true,
            path: "/",
        });

        res.clearCookie("userName", "", {
            path: "/",
        });
        res.clearCookie("role", "", {
            path: "/",
        });
        res.clearCookie("email", "", {
            path: "/",
        });
        res.clearCookie("userId", "", {
            path: "/",
        });
        res.status(200).json(
            httpResponse("success", {}, "Successfully logged out.")
        );
    } catch (error) {
        res.status(401).json({
            msg: "Can't logout in this User",
            error,
        });
    }
};

module.exports.getLoggedInUser = async (req, res) => {
    try {
        const userFound = await User.findById(req.user.id, {
            password: 0,
        });
        if (userFound) {
            res.status(200).json(
                httpResponse("success", userFound, "User found")
            );
        } else {
            res.status(401).json(httpResponse("fail", {}, "User not found"));
        }
    } catch (err) {
        console.log(err);
        res.status(500).json(httpResponse("error", {}, err.toString()));
    }
};
