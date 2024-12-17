const mongoose = require("mongoose");
require("./Department");
require("./SubDepartment");
require("./User");

const schema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
    },
    body: {
      type: String,
      required: true,
    },
    department: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Department",
      required: true,
    },
    subDepartment: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "SubDepartment",
    },
    priority: {
      type: Number,
      default: 1,
      enum: [1, 2, 3],
    },
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    hasAnswer: {
      type: Boolean,
      default: false,
    },
    isAnswer: {
      type: Boolean,
      default: false,
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

const model = mongoose.models.Ticket || mongoose.model("Ticket", schema);

export default model;
