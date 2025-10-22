const User = require("../models/User");

// Get the user's cart
exports.getCart = async (req, res) => {
  try {
    const user = await User.findById(req.user.id).populate("cart.plant");
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    res.json(user.cart);
  } catch (err) {
    res.status(500).json({ message: "Server Error", error: err.message });
  }
};

// Add an item to the cart
exports.addToCart = async (req, res) => {
  try {
    const { plantId, quantity } = req.body;
    const user = await User.findById(req.user.id);

    const cartItemIndex = user.cart.findIndex(
      (item) => item.plant.toString() === plantId
    );

    if (cartItemIndex > -1) {
      // If item exists, update quantity
      user.cart[cartItemIndex].quantity += quantity;
    } else {
      // If item does not exist, add it to cart
      user.cart.push({ plant: plantId, quantity });
    }

    await user.save();
    const populatedUser = await User.findById(req.user.id).populate(
      "cart.plant"
    );
    res.status(200).json(populatedUser.cart);
  } catch (err) {
    res.status(500).json({ message: "Server Error", error: err.message });
  }
};

// Remove an item from the cart
exports.removeFromCart = async (req, res) => {
  try {
    const { plantId } = req.params;
    const user = await User.findById(req.user.id);

    user.cart = user.cart.filter((item) => item.plant.toString() !== plantId);

    await user.save();
    const populatedUser = await User.findById(req.user.id).populate(
      "cart.plant"
    );
    res.status(200).json(populatedUser.cart);
  } catch (err) {
    res.status(500).json({ message: "Server Error", error: err.message });
  }
};

// Clear the entire cart
exports.clearCart = async (req, res) => {
  try {
    const user = await User.findById(req.user.id);
    user.cart = [];
    await user.save();
    res.status(200).json([]);
  } catch (err) {
    res.status(500).json({ message: "Server Error", error: err.message });
  }
};
