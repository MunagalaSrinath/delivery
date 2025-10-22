// // const mongoose = require("mongoose");

// // const userSchema = new mongoose.Schema({
// //   name: { type: String, required: true },
// //   phone: { type: String, required: true, unique: true },
// //   email: { type: String, required: true, unique: true },
// //   role: { type: String, enum: ["customer", "admin"], default: "customer" }, // default = customer
// // });

// // module.exports = mongoose.model("User", userSchema);
// // models/User.js

// const mongoose = require("mongoose");

// const userSchema = new mongoose.Schema({
//   name: { type: String, required: true },
//   phone: { type: String, required: true },
//   email: { type: String, required: true, unique: true },
//   // ✅ ADDED: A required password field
//   password: { type: String, required: true, minlength: 6 },
//   role: { type: String, enum: ["customer", "admin"], default: "customer" },
// });

// module.exports = mongoose.model("User", userSchema);
const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  name: { type: String, required: true },
  phone: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true, minlength: 6 },
  role: { type: String, enum: ["customer", "admin"], default: "customer" },
  // --- ADD THIS ENTIRE BLOCK ---
  cart: [
    {
      plant: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Plant", // This links to your Plant model
        required: true,
      },
      quantity: {
        type: Number,
        required: true,
        min: 1,
        default: 1,
      },
    },
  ],
  // -----------------------------
});

module.exports = mongoose.model("User", userSchema);
