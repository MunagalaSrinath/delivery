// const mongoose = require("mongoose");

// const plantSchema = new mongoose.Schema({
//   name: { type: String, required: true },
//   price: { type: Number, required: true },
//   stock: { type: Number, required: true },
//   category: { type: String },
//   imageUrl: { type: String, default: "" }, // <-- ADD THIS LINE
// });

// module.exports = mongoose.model("Plant", plantSchema);
const mongoose = require("mongoose");

const plantSchema = new mongoose.Schema({
  name: { type: String, required: true },
  price: { type: Number, required: true },
  stock: { type: Number, required: true },
  category: { type: String },
  // --- CHANGE THIS LINE ---
  imageUrls: { type: [String], default: [] }, // Changed to an array of strings
});

module.exports = mongoose.model("Plant", plantSchema);
