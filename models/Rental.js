const mongoose = require("mongoose");
const Schema = mongoose.Schema;

var rentalSchema = new Schema(
    {
        title: {
            type: String,
        },
        description: {
            type: String,
        },
        location: {
            type: String,
        },
        pricePerHour: {
            type: Number,
        },
        images: [
            {
                type: String,
            },
        ],
        availableFrom: {
            type: Date,
        },
        availableTo: {
            type: Date,
        },
        owner: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
        amenities: [
            {
                type: String,
            },
        ],
        capacity: {
            type: Number,
        },
    },
    {
        timestamps: true,
    }
);

module.exports = mongoose.model("Rental", rentalSchema);
