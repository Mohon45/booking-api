const { httpResponse } = require("../utils/httpResponse");
const BookingService = require("../services/Booking.service");

module.exports.get_booking_list = async (req, res) => {
    try {
        let query = req.query;

        const result = await BookingService.getAll(query);

        res.status(200).json(
            httpResponse("success", result, "Booking List found")
        );
    } catch (error) {
        res.status(500).json(httpResponse("Error", {}, error.message));
    }
};

module.exports.get_booking = async (req, res) => {
    try {
        const id = req.params.id;

        const result = await BookingService.getById(id);
        res.status(200).json(httpResponse("success", result, "Booking found"));
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
        const result = await BookingService.create(req.body);
        res.status(201).json(
            httpResponse("success", result, "Booking created")
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

        const result = await BookingService.update(id, req.body);

        res.status(200).json(
            httpResponse("success", result, "Booking Updated!")
        );
    } catch (error) {
        res.status(500).json(httpResponse("Error", {}, error.message));
    }
};

module.exports.delete = async (req, res) => {
    try {
        const id = req.params.id;

        const result = await BookingService.delete(id);

        res.status(200).json(
            httpResponse(
                "success",
                { id: id },
                "Booking was deleted successfully"
            )
        );
    } catch (error) {
        res.status(500).json(httpResponse("Error", {}, error.message));
    }
};
