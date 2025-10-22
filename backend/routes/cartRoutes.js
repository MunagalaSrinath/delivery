const express = require("express");
const router = express.Router();
const cartController = require("../controllers/cartController");
const { authenticateToken } = require("../middleware/auth");

// All cart routes are protected and require a logged-in user
router.use(authenticateToken);

// GET /api/cart - Get user's cart
router.get("/", cartController.getCart);

// POST /api/cart/add - Add item to cart
router.post("/add", cartController.addToCart);

// DELETE /api/cart/remove/:plantId - Remove item from cart
router.delete("/remove/:plantId", cartController.removeFromCart);

// DELETE /api/cart/clear - Clear the cart
router.delete("/clear", cartController.clearCart);

module.exports = router;
