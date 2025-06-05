const { httpResponse } = require("../utils/httpResponse");
const RequestService = require("../services/RoommateRequest.service");

module.exports.get_roommate_request_list = async (req, res) => {
    try {
        let query = req.query;

        const result = await RequestService.getAll(query);

        res.status(200).json(
            httpResponse("success", result, "Roommate Request List found")
        );
    } catch (error) {
        res.status(500).json(httpResponse("Error", {}, error.message));
    }
};

module.exports.get_roommate_request = async (req, res) => {
    try {
        const id = req.params.id;

        const result = await RequestService.getById(id);
        res.status(200).json(
            httpResponse("success", result, "Roommate Request found")
        );
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
        const result = await RequestService.create(req.body);
        res.status(201).json(
            httpResponse("success", result, "Roommate Request created")
        );
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
        const id = req.params.id;

        const result = await RequestService.update(id, req.body);

        res.status(200).json(
            httpResponse("success", result, "Roommate Request Updated!")
        );
    } catch (error) {
        res.status(500).json(httpResponse("Error", {}, error.message));
    }
};

module.exports.delete = async (req, res) => {
    try {
        const id = req.params.id;

        const result = await RequestService.delete(id);

        res.status(200).json(
            httpResponse(
                "success",
                { user_id: user_id },
                "Roommate Request was deleted successfully"
            )
        );
    } catch (error) {
        res.status(500).json(httpResponse("Error", {}, error.message));
    }
};
