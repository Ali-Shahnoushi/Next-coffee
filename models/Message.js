const mongoose = require("mongoose");
require("./Ticket");
require("./User");

const schema = new mongoose.Schema(
  {
    body: {
      type: String,
      required: true,
    },
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    mainTicket: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Ticket",
      required: false,
    },
  },
  {
    timestamps: true,
  }
);

const model = mongoose.models.Message || mongoose.model("Message", schema);

export default model;
