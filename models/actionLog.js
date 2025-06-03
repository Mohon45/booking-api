const mongoose = require("mongoose");
const Schema = mongoose.Schema;
ObjectId = Schema.ObjectId;

var logSchema = new Schema(
  {
      actionName: { type: String, default: "" },
      actionDesc: { type: String, default: "" },
      action_by: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
      ip: { type: String, default: "" },
      reqBody: { type: String, default: "" },
      controller: [],
  },
  { strict: false, timestamps: true },
);

module.exports = mongoose.models.ActionLog || mongoose.model("ActionLog", logSchema, "actionLog");
