const mongoose = require("mongoose");
const Schema = mongoose.Schema;
ObjectId = Schema.ObjectId;

var userSchema = new Schema(
    {
        name: {
            type: String,
        },
        email: {
            type: String,
            required: [true, "Email is Required"],
        },
        password: {
            type: String,
        },
        phone: {
            type: String,
        },
        role: {
            type: String,
            enum: ["user", "admin"],
            default: "user",
        },
        profilePhoto: {
            type: String,
        },
        wishlist: [{ type: Schema.Types.ObjectId, ref: "Rental" }],
    },
    {
        timestamps: true,
        strict: false,
    }
);

module.exports = mongoose.models.User || mongoose.model("User", userSchema);
