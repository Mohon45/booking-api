const mongoose = require("mongoose");

const bookingSchema = new mongoose.Schema(
    {
        rental: { type: mongoose.Schema.Types.ObjectId, ref: "Rental" },
        user: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
        date: {
            type: Date,
        },
        hoursBooked: {
            type: Number,
        },
        totalAmount: {
            type: Number,
        },
        status: {
            type: String,
            enum: ["pending", "confirmed", "cancelled"],
            default: "pending",
        },
    },
    { timestamps: true }
);

module.exports = mongoose.model("Booking", bookingSchema);
