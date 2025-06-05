const mongoose = require("mongoose");

const roommateRequestSchema = new mongoose.Schema(
    {
        fromUser: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
        toUser: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
        rental: { type: mongoose.Schema.Types.ObjectId, ref: "Rental" },
        status: {
            type: String,
            enum: ["pending", "accepted", "declined"],
            default: "pending",
        },
        message: {
            type: String,
        },
    },
    { timestamps: true }
);

module.exports = mongoose.model("RoommateRequest", roommateRequestSchema);
