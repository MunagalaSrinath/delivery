// // // // // const express = require("express");
// // // // // const Plant = require("../models/Plant");
// // // // // const User = require("../models/User");

// // // // // const router = express.Router();

// // // // // // Middleware: check admin
// // // // // async function checkAdmin(req, res, next) {
// // // // //   try {
// // // // //     const { email } = req.body; // assuming admin passes email in request
// // // // //     const user = await User.findOne({ email });

// // // // //     if (!user || user.role !== "admin") {
// // // // //       return res.status(403).json({ message: "Access denied. Admins only." });
// // // // //     }

// // // // //     next();
// // // // //   } catch (err) {
// // // // //     res.status(500).json({ message: "Server Error", error: err.message });
// // // // //   }
// // // // // }

// // // // // // Admin adds new plant
// // // // // router.post("/", checkAdmin, async (req, res) => {
// // // // //   try {
// // // // //     const plant = new Plant(req.body);
// // // // //     await plant.save();
// // // // //     res.status(201).json(plant);
// // // // //   } catch (err) {
// // // // //     res.status(500).json({ message: "Server Error", error: err.message });
// // // // //   }
// // // // // });

// // // // // // Admin updates stock
// // // // // router.put("/:id/stock", checkAdmin, async (req, res) => {
// // // // //   try {
// // // // //     const { stock } = req.body;
// // // // //     const updatedPlant = await Plant.findByIdAndUpdate(
// // // // //       req.params.id,
// // // // //       { $set: { stock } },
// // // // //       { new: true }
// // // // //     );
// // // // //     res.json(updatedPlant);
// // // // //   } catch (err) {
// // // // //     res.status(500).json({ message: "Server Error", error: err.message });
// // // // //   }
// // // // // });

// // // // // module.exports = router;
// // // // // In plantRoutes.js

// // // // const express = require("express");
// // // // const Plant = require("../models/Plant");
// // // // const plantController = require("../controllers/plantController");
// // // // // User model is no longer needed here for auth
// // // // const { validatePlant } = require("../middleware/validation");
// // // // const jwt = require("jsonwebtoken"); // <-- Import jsonwebtoken

// // // // const router = express.Router();

// // // // // ✅ Middleware 1: Verify the JWT
// // // // function authenticateToken(req, res, next) {
// // // //   const authHeader = req.headers["authorization"];
// // // //   const token = authHeader && authHeader.split(" ")[1]; // Bearer TOKEN

// // // //   if (token == null) {
// // // //     return res.sendStatus(401); // Unauthorized
// // // //   }

// // // //   jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
// // // //     if (err) {
// // // //       return res.sendStatus(403); // Forbidden (invalid token)
// // // //     }
// // // //     req.user = user; // Attach user payload (id, role) to the request object
// // // //     next();
// // // //   });
// // // // }

// // // // // ✅ Middleware 2: Check if the user is an admin
// // // // function isAdmin(req, res, next) {
// // // //   if (req.user.role !== "admin") {
// // // //     return res.status(403).json({ message: "Access denied. Admins only." });
// // // //   }
// // // //   next();
// // // // }

// // // // // Admin adds new plant - NOW SECURE!
// // // // // We chain the middlewares. First authenticate, then check for admin role.
// // // // router.post("/", [authenticateToken, isAdmin], async (req, res) => {
// // // //   try {
// // // //     // Note: We get the plant data from the body, but NOT the email for auth.
// // // //     const { name, price, stock, category } = req.body;
// // // //     const plant = new Plant({ name, price, stock, category });
// // // //     await plant.save();
// // // //     res.status(201).json(plant);
// // // //   } catch (err) {
// // // //     res.status(500).json({ message: "Server Error", error: err.message });
// // // //   }
// // // // });

// // // // // Admin updates stock - NOW SECURE!
// // // // router.put("/:id/stock", [authenticateToken, isAdmin], async (req, res) => {
// // // //   try {
// // // //     const { stock } = req.body;
// // // //     const updatedPlant = await Plant.findByIdAndUpdate(
// // // //       req.params.id,
// // // //       { $set: { stock } },
// // // //       { new: true }
// // // //     );
// // // //     res.json(updatedPlant);
// // // //   } catch (err) {
// // // //     res.status(500).json({ message: "Server Error", error: err.message });
// // // //   }
// // // // });

// // // // module.exports = router;
// // // // const express = require("express");
// // // // const router = express.Router();
// // // // const plantController = require("../controllers/plantController");
// // // // const { authenticateToken, isAdmin } = require("../middleware/auth");
// // // // const { validatePlant } = require("../middleware/validation");

// // // // // ✅ PUBLIC ROUTE: Anyone can get the list of plants.
// // // // router.get("/", plantController.getAllPlants);

// // // // // ✅ SECURE ROUTE: Only admins can add a new plant.
// // // // router.post(
// // // //   "/",
// // // //   [authenticateToken, isAdmin, validatePlant],
// // // //   plantController.createPlant
// // // // );

// // // // // ✅ SECURE ROUTE: Only admins can update plant stock.
// // // // router.put(
// // // //   "/:id/stock",
// // // //   [authenticateToken, isAdmin],
// // // //   plantController.updateStock
// // // // );

// // // // module.exports = router;
// // // const express = require("express");
// // // const router = express.Router();
// // // const plantController = require("../controllers/plantController");
// // // const { authenticateToken, isAdmin } = require("../middleware/auth");
// // // const { validatePlant } = require("../middleware/validation");

// // // // Get all plants (public route)
// // // router.get("/", plantController.getAllPlants);

// // // // Add a new plant (Admin only)
// // // router.post(
// // //   "/",
// // //   [authenticateToken, isAdmin, validatePlant],
// // //   plantController.createPlant
// // // );

// // // // Update plant stock (Admin only)
// // // router.put(
// // //   "/:id/stock",
// // //   [authenticateToken, isAdmin],
// // //   plantController.updateStock
// // // );

// // // // ✅ NEW: Delete a plant (Admin only)
// // // router.delete(
// // //   "/:id",
// // //   [authenticateToken, isAdmin],
// // //   plantController.deletePlant
// // // );

// // // router.put(
// // //   "/:id",
// // //   [authenticateToken, isAdmin, validatePlant],
// // //   plantController.updatePlant
// // // );

// // // module.exports = router;
// // const express = require("express");
// // const router = express.Router();
// // const plantController = require("../controllers/plantController");
// // const { authenticateToken, isAdmin } = require("../middleware/auth");
// // const { validatePlant } = require("../middleware/validation");

// // // Get all plants (public route, can also handle search)
// // router.get("/", plantController.getAllPlants);

// // // --- ADDED THIS ROUTE ---
// // // Get a single plant by its ID (Public Route)
// // router.get("/:id", plantController.getPlantById);

// // // Add a new plant (Admin only)
// // router.post(
// //   "/",
// //   [authenticateToken, isAdmin, validatePlant],
// //   plantController.createPlant
// // );

// // // Update a plant's details (Admin only)
// // router.put(
// //   "/:id",
// //   [authenticateToken, isAdmin, validatePlant],
// //   plantController.updatePlant
// // );

// // // Update plant stock (Admin only) - Note: This is more specific than the general update
// // router.put(
// //   "/:id/stock",
// //   [authenticateToken, isAdmin],
// //   plantController.updateStock
// // );

// // // Delete a plant (Admin only)
// // router.delete(
// //   "/:id",
// //   [authenticateToken, isAdmin],
// //   plantController.deletePlant
// // );

// // module.exports = router;
// const express = require("express");
// const router = express.Router();
// const plantController = require("../controllers/plantController");
// const { authenticateToken, isAdmin } = require("../middleware/auth");
// const { validatePlant } = require("../middleware/validation");

// // GET /api/plants - Get all plants (public route, can also handle search)
// router.get("/", plantController.getAllPlants);

// // GET /api/plants/:id - Get a single plant by its ID (Public Route)
// router.get("/:id", plantController.getPlantById);

// // POST /api/plants - Add a new plant (Admin only)
// router.post(
//   "/",
//   [authenticateToken, isAdmin, validatePlant],
//   plantController.createPlant
// );

// // PUT /api/plants/:id - Update a plant's details (Admin only)
// router.put(
//   "/:id",
//   [authenticateToken, isAdmin, validatePlant],
//   plantController.updatePlant
// );

// // PUT /api/plants/:id/stock - A specific route to update only stock (Admin only)
// router.put(
//   "/:id/stock",
//   [authenticateToken, isAdmin],
//   plantController.updateStock
// );

// // DELETE /api/plants/:id - Delete a plant (Admin only)
// router.delete(
//   "/:id",
//   [authenticateToken, isAdmin],
//   plantController.deletePlant
// );

// module.exports = router;
const express = require("express");
const router = express.Router();
const plantController = require("../controllers/plantController");
const { authenticateToken, isAdmin } = require("../middleware/auth");
const { validatePlant } = require("../middleware/validation");

// GET /api/plants - Get all plants (public route, can also handle search)
router.get("/", plantController.getAllPlants);

// GET /api/plants/:id - Get a single plant by its ID (Public Route)
router.get("/:id", plantController.getPlantById);

// POST /api/plants - Add a new plant (Admin only)
router.post(
  "/",
  [authenticateToken, isAdmin, validatePlant],
  plantController.createPlant
);

// PUT /api/plants/:id - Update a plant's details (Admin only)
router.put(
  "/:id",
  [authenticateToken, isAdmin, validatePlant],
  plantController.updatePlant
);

// PUT /api/plants/:id/stock - A specific route to update only stock (Admin only)
router.put(
  "/:id/stock",
  [authenticateToken, isAdmin],
  plantController.updateStock
);

// DELETE /api/plants/:id - Delete a plant (Admin only)
router.delete(
  "/:id",
  [authenticateToken, isAdmin],
  plantController.deletePlant
);

module.exports = router;
