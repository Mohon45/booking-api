const jwt = require("jsonwebtoken");

const clearCookies = (res) => {
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
            httpOnly: true,
            sameSite: "strict",
            secure: true,
            path: "/",
        });

        res.clearCookie("username", "", {
            path: "/",
        });
        return res;
    } catch (e) {
        console.log(e);
        return res;
    }
};

const createToken = (params, secret, expiresIn = null) => {
    const maxAge = 3 * 24 * 60 * 60;
    return jwt.sign({ ...params }, secret, {
        expiresIn: expiresIn ?? maxAge,
    });
};

const isJson = (str) => {
    try {
        JSON.parse(str);
    } catch (e) {
        return false;
    }
    return true;
};

module.exports = {
    clearCookies,
    createToken,
    isJson,
};
