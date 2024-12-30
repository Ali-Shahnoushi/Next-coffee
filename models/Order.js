const mongoose = require("mongoose");
require("./User");
require("./Product");
require("./Discount");

const schema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    products: [
      {
        product: {
          type: mongoose.Schema.Types.ObjectId,
          ref: "Product",
          required: true,
        },
        quantity: {
          type: Number,
          required: true,
          default: 1,
        },
        price: {
          type: Number,
          required: true, // Snapshot of the product price at the time of order
        },
      },
    ],
    discount: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Discount", // Reference to the Discount model
      required: false,
    },
    totalAmount: {
      type: Number,
      required: true, // Total amount after applying discounts
    },
    status: {
      type: String,
      enum: ["PENDING", "PAID", "DELIVERED", "CANCELLED"],
      default: "PENDING",
    },
    paymentMethod: {
      type: String,
      default: "CREDIT_CARD",
    },
    shippingAddress: {
      fullName: {
        type: String,
        required: true,
      },
      phone: {
        type: String,
        required: true,
      },
      address: {
        type: String,
        required: true,
      },
      city: {
        type: String,
        required: true,
      },
      postalCode: {
        type: String,
        required: true,
      },
      country: {
        type: String,
        default: "IRAN",
      },
    },
  },
  {
    timestamps: true, // Automatically add createdAt and updatedAt fields
  }
);

const model = mongoose.models?.Order || mongoose.model("Order", schema);

module.exports = model;
