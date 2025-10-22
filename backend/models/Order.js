// const mongoose = require("mongoose");

// const orderSchema = new mongoose.Schema(
//   {
//     customerName: { type: String, required: true },
//     phone: { type: String, required: true },
//     address: { type: String, required: true },
//     plants: [
//       {
//         name: String,
//         quantity: Number,
//         price: Number,
//       },
//     ],
//     totalAmount: { type: Number, required: true },
//     deliveryCharge: { type: Number, default: 0 },
//     status: { type: String, default: "Pending" },
//   },
//   { timestamps: true }
// );

// module.exports = mongoose.model("Order", orderSchema);
// models/Order.js

const mongoose = require("mongoose");

const orderSchema = new mongoose.Schema(
  {
    // ✅ ADDED: This line links the order to a User document.
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    customerName: { type: String, required: true },
    phone: { type: String, required: true },
    address: { type: String, required: true },
    plants: [
      {
        name: String,
        quantity: Number,
        price: Number,
      },
    ],
    totalAmount: { type: Number, required: true },
    deliveryCharge: { type: Number, default: 0 },
    status: { type: String, default: "Pending" }, // e.g., Pending, Shipped, Delivered, Cancelled
  },
  { timestamps: true }
);

module.exports = mongoose.model("Order", orderSchema);
