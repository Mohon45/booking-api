const { httpResponse } = require("../utils/httpResponse");
const RentalService = require("../services/Rental.service");

module.exports.get_rental_list = async (req, res) => {
    try {
        let query = req.query;

        const result = await RentalService.getAll(query);

        res.status(200).json(
            httpResponse("success", result, "Rental List found")
        );
    } catch (error) {
        res.status(500).json(httpResponse("Error", {}, error.message));
    }
};

module.exports.get_rental = async (req, res) => {
    try {
        const id = req.params.id;

        const result = await RentalService.getById(id);
        res.status(200).json(httpResponse("success", result, "Rental found"));
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
        const result = await RentalService.create(req.body);
        res.status(201).json(httpResponse("success", result, "Rental created"));
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

        const result = await RentalService.update(id, req.body);

        res.status(200).json(
            httpResponse("success", result, "Rental Updated!")
        );
    } catch (error) {
        res.status(500).json(httpResponse("Error", {}, error.message));
    }
};

module.exports.delete = async (req, res) => {
    try {
        const id = req.params.id;

        const result = await RentalService.delete(id);

        res.status(200).json(
            httpResponse(
                "success",
                { id: id },
                "Rental was deleted successfully"
            )
        );
    } catch (error) {
        res.status(500).json(httpResponse("Error", {}, error.message));
    }
};
