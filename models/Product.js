const { default: mongoose } = require("mongoose");

// import mongoose from "mongoose";
require("./Comment");

const schema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  price: {
    type: Number,
    required: true,
  },
  shortDescription: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  weight: {
    type: Number,
    required: true,
  },
  suitableFor: {
    type: String,
    required: true,
  },
  smell: {
    type: String,
    required: true,
  },
  score: {
    type: Number,
    default: 5,
  },
  comments: {
    type: [{ type: mongoose.Types.ObjectId, ref: "Comment" }],
    required: true,
  },
  tags: {
    type: [String],
    required: true,
  },
});

const model = mongoose.models?.Product || mongoose.model("Product", schema);

module.exports = model;
