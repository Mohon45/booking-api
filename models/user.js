const mongoose = require("mongoose");
const Schema = mongoose.Schema;
ObjectId = Schema.ObjectId;

var userSchema = new Schema(
  {
    firstName: {
      type: String,
    },
    lastName: {
      type: String,
    },
    firstNameBangla: {
      type: String,
    },
    lastNameBangla: {
      type: String,
    },
    userName: {
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
    dob: {
      type: Date,
    },
    institution: {
      type: String,
    },
    role: {
      type: String,
      enum: ["user", "doner", "admin"],
      default: "user",
    },
    donationAvailability: {
      type: String,
      enum: ["available", "unavailable"],
      default: "available",
    },
    profilePhoto: {
      type: String,
    },
    bloodGroup: {
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
    otherFiles: [
      {
        type: String,
      },
    ],
    lastLoggedIn: {
      type: Date,
    },
  },
  {
    timestamps: true,
    strict: false,
  }
);

module.exports =
  mongoose.models.User || mongoose.model("User", userSchema, "users");
