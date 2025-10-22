const express = require("express");
const User = require("../models/User");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const { authenticateToken, isAdmin } = require("../middleware/auth");

const router = express.Router();

router.post("/register", async (req, res, next) => {
  try {
    const { name, phone, email, password } = req.body;

    if (!name || !email || !password || !phone) {
      return res.status(400).json({ message: "All fields are required" });
    }

    let existingUser = await User.findOne({ email: email });
    if (existingUser) {
      return res
        .status(400)
        .json({ message: "User with this email already exists." });
    }

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    // This is the original, correct logic.
    const user = new User({
      name,
      phone,
      email,
      password: hashedPassword,
      role: "customer", // Default role is always customer
    });

    await user.save();

    res.status(201).json({ message: "User registered successfully." });
  } catch (err) {
    next(err);
  }
});

// Secure User Login Route
router.post("/login", async (req, res, next) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res
        .status(400)
        .json({ message: "Email and password are required." });
    }

    const user = await User.findOne({ email: email });
    if (!user) {
      return res.status(400).json({ message: "Invalid credentials." });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ message: "Invalid credentials." });
    }

    const payload = {
      id: user._id,
      role: user.role,
      name: user.name, // <-- ADD THIS LINE
    };

    const token = jwt.sign(payload, process.env.JWT_SECRET, {
      expiresIn: "1d",
    });

    res.json({
      message: "Login successful",
      token: token,
      user: {
        id: user._id,
        name: user.name,
        role: user.role,
      },
    });
  } catch (err) {
    next(err);
  }
});

// Admin-Only User Management Routes
router.get("/users", [authenticateToken, isAdmin], async (req, res) => {
  try {
    const users = await User.find();
    res.json(users);
  } catch (err) {
    res.status(500).json({ message: "Server Error", error: err.message });
  }
});

router.delete("/users/:id", [authenticateToken, isAdmin], async (req, res) => {
  try {
    const userIdToDelete = req.params.id;
    const adminId = req.user.id;

    if (userIdToDelete === adminId) {
      return res
        .status(400)
        .json({ message: "Admin cannot delete their own account." });
    }

    const user = await User.findByIdAndDelete(userIdToDelete);

    if (!user) {
      return res.status(404).json({ message: "User not found." });
    }

    res.status(200).json({ message: "User deleted successfully." });
  } catch (err) {
    res.status(500).json({ message: "Server Error", error: err.message });
  }
});

module.exports = router;
