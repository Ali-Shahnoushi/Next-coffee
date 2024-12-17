const mongoose = require("mongoose");

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
  isAccepted: {
    type: Boolean,
    default: false,
  },
  date: {
    type: Date,
    immutable: true,
    default: () => Date.now(),
  },
  productID: {
    type: mongoose.Schema.Types.ObjectId, 
    ref: "Product",
  },
});

const model = mongoose.models?.Comment || mongoose.model("Comment", schema);

module.exports = model;
