const Order = require("../models/Order");
const Plant = require("../models/Plant");

// This is the main function for creating an order.
exports.createOrder = async (req, res, next) => {
  try {
    const { customerName, phone, address, plants, deliveryCharge } = req.body;
    const userId = req.user.id; // Get user ID from the secure token middleware

    // --- SECURITY: Always calculate the total on the server ---
    let calculatedTotalAmount = 0;
    for (const item of plants) {
      const plantFromDB = await Plant.findOne({ name: item.name });
      if (!plantFromDB) {
        return res
          .status(404)
          .json({ message: `Plant ${item.name} not found` });
      }
      if (plantFromDB.stock < item.quantity) {
        return res.status(400).json({
          message: `Not enough stock for ${item.name}. Available: ${plantFromDB.stock}`,
        });
      }
      calculatedTotalAmount += item.quantity * plantFromDB.price;
    }

    // After validation, reduce stock for each plant
    for (const item of plants) {
      await Plant.updateOne(
        { name: item.name },
        { $inc: { stock: -item.quantity } }
      );
    }

    const order = new Order({
      userId,
      customerName,
      phone,
      address,
      plants,
      totalAmount: calculatedTotalAmount,
      deliveryCharge,
      status: "Pending",
    });

    // --- FINAL DEBUGGING STEP ---
    // Log the exact object we are trying to save to the database.
    console.log(
      "Attempting to save order object:",
      JSON.stringify(order, null, 2)
    );

    const savedOrder = await order.save();
    res.status(201).json(savedOrder);
  } catch (err) {
    console.error("Error creating order:", err);
    next(err);
  }
};

// --- The rest of your controller functions (no changes needed) ---

exports.getMyOrders = async (req, res, next) => {
  try {
    const orders = await Order.find({ userId: req.user.id }).sort({
      createdAt: -1,
    });
    res.json(orders);
  } catch (err) {
    next(err);
  }
};

exports.getAllOrders = async (req, res, next) => {
  try {
    const orders = await Order.find().sort({ createdAt: -1 });
    res.json(orders);
  } catch (err) {
    next(err);
  }
};

exports.updateOrderStatus = async (req, res, next) => {
  try {
    const { status } = req.body;
    if (!status) {
      return res.status(400).json({ message: "Status is required." });
    }
    const updatedOrder = await Order.findByIdAndUpdate(
      req.params.id,
      { $set: { status } },
      { new: true }
    );
    if (!updatedOrder) {
      return res.status(404).json({ message: "Order not found." });
    }
    res.json(updatedOrder);
  } catch (err) {
    next(err);
  }
};
