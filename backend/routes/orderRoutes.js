// const express = require("express");
// const Order = require("../models/Order");
// const Plant = require("../models/Plant");

// const router = express.Router();

// // Create order
// router.post("/", async (req, res) => {
//   try {
//     const { customerName, phone, address, plants, deliveryCharge } = req.body;

//     let totalAmount = 0;

//     // Check stock for each plant
//     for (let item of plants) {
//       const plant = await Plant.findOne({ name: item.name });

//       if (!plant) {
//         return res
//           .status(404)
//           .json({ message: `Plant ${item.name} not found` });
//       }

//       if (plant.stock < item.quantity) {
//         return res.status(400).json({
//           message: `Not enough stock for ${item.name}. Available: ${plant.stock}`,
//         });
//       }

//       totalAmount += item.quantity * item.price;

//       // Reduce stock
//       plant.stock -= item.quantity;
//       await plant.save();
//     }

//     const order = new Order({
//       customerName,
//       phone,
//       address,
//       plants,
//       totalAmount,
//       deliveryCharge,
//       status: "Pending",
//     });

//     const savedOrder = await order.save();
//     res.status(201).json(savedOrder);
//   } catch (err) {
//     res.status(500).json({ message: "Server Error", error: err.message });
//   }
// });

// module.exports = router;
// routes/orderRoutes.js

const express = require("express");
const router = express.Router();
const orderController = require("../controllers/orderController");
const { authenticateToken, isAdmin } = require("../middleware/auth");

// ✅ SECURE: Create a new order (only for logged-in users)
router.post("/", authenticateToken, orderController.createOrder);

// ✅ NEW: Get orders for the currently logged-in user
router.get("/my-orders", authenticateToken, orderController.getMyOrders);

// --- ADMIN ONLY ROUTES ---

// ✅ NEW: Get all orders from all users (Admin only)
router.get("/", [authenticateToken, isAdmin], orderController.getAllOrders);

// ✅ NEW: Update an order's status (Admin only)
router.patch(
  "/:id/status",
  [authenticateToken, isAdmin],
  orderController.updateOrderStatus
);

module.exports = router;
