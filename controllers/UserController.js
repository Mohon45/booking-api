const { httpResponse } = require("../utils/httpResponse");
const UserService = require("../services/User.service");

module.exports.get_user_list = async (req, res) => {
    try {
        let query = req.query;

        const result = await UserService.getAll(query);

        res.status(200).json(
            httpResponse("success", result, "User List found")
        );
    } catch (error) {
        res.status(500).json(httpResponse("Error", {}, error.message));
    }
};

module.exports.get_user = async (req, res) => {
    try {
        const user_id = req.params.id;

        const result = await UserService.getById(user_id);
        res.status(200).json(httpResponse("success", result, "User found"));
    } catch (error) {
        res.status(500).json(httpResponse("Error", {}, error.message));
    }
};

module.exports.create = async (req, res) => {
    if (!req.body) {
        res.status(400).json(
            httpResponse("fail", {}, "Content cannot be empty")
        );
        return;
    }

    try {
        const result = await UserService.create(req.body);
        res.status(201).json(httpResponse("success", result, "User created"));
    } catch (error) {
        res.status(500).json(httpResponse("Error", {}, error.message));
    }
};

module.exports.update = async (req, res) => {
    if (!req.body) {
        res.staus(400).json(
            httpResponse("fail", {}, "Content cannot be empty")
        );
    }

    try {
        const user_id = req.params.id;

        const result = await UserService.update(user_id, req.body);

        res.status(200).json(httpResponse("success", result, "User Updated!"));
    } catch (error) {
        res.status(500).json(httpResponse("Error", {}, error.message));
    }
};

module.exports.delete = async (req, res) => {
    try {
        const user_id = req.params.id;

        const result = await UserService.delete(user_id);

        res.status(200).json(
            httpResponse(
                "success",
                { user_id: user_id },
                "user was deleted successfully"
            )
        );
    } catch (error) {
        res.status(500).json(httpResponse("Error", {}, error.message));
    }
};
