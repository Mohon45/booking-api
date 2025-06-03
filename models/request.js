const mongoose = require("mongoose");
const Schema = mongoose.Schema;

var requestSchema = new Schema(
  {
    title: {
      type: String,
    },
    request_blood_type: {
      type: String,
      enum: [
        "a_positive",
        "a_negative",
        "b_positive",
        "b_negative",
        "ab_positive",
        "ab_negative",
        "o_positive",
        "o_negative",
      ],
      default: "a_positive",
    },
    description: {
      type: String,
    },
    phone: {
      type: String,
    },
    status: {
      type: String,
      enum: ["pending", "accepted"],
      default: "pending",
    },
    division: {
      type: String,
    },
    zilla: {
      type: String,
    },
    upazila: {
      type: String,
    },
    requested_by: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
    accepted_doner: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Request", requestSchema, "request");
