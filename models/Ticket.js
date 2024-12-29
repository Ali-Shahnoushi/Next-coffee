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
  },
  {
    timestamps: true,
  }
);

const model = mongoose.models.Ticket || mongoose.model("Ticket", schema);

export default model;
