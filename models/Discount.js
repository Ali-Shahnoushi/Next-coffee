const mongoose = require("mongoose");

const schema = new mongoose.Schema(
  {
    code: {
      type: String,
      required: true,
    },
    percent: {
      type: Number,
      required: true,
    },
    maxUse: {
      type: Number,
      required: true,
    },
    uses: {
      type: Number,
      default: 0,
    },
  },
  {
    timestamps: true,
  }
);

const model = mongoose.models?.Discount || mongoose.model("Discount", schema);

module.exports = model;
