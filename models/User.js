import mongoose from "mongoose";

const schema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: false,
  },
  password: {
    type: String,
    required: false,
  },
  phone: {
    type: String,
    required: true,
  },
  role: {
    type: String,
    default: "USER",
  },
  refreshToken: String,
});

const model = mongoose.models?.User || mongoose.model("User", schema);

module.exports = model;
