import mongoose from "mongoose";
require("./Product");

const schema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  body: {
    type: String,
    required: true,
  },
  score: {
    type: Number,
    required: true,
    min: 0,
    max: 5,
  },
  date: {
    type: Date,
    immutable: true,
    default: () => Date.now(),
  },
  product: {
    type: mongoose.Types.ObjectId,
    ref: "Product",
  },
});

const model = mongoose.models?.Comment || mongoose.model("Comment", schema);

module.exports = model;
