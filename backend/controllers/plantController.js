// // controllers/plantController.js

// const Plant = require("../models/Plant");

// // We've moved the function here and gave it a name: "createPlant"
// // ✅ NEW: Function to get all plants
// exports.getAllPlants = async (req, res) => {
//   try {
//     const plants = await Plant.find();
//     res.json(plants);
//   } catch (err) {
//     res.status(500).json({ message: "Server Error", error: err.message });
//   }
// };
// exports.createPlant = async (req, res) => {
//   try {
//     const plant = new Plant(req.body);
//     await plant.save();
//     res.status(201).json(plant);
//   } catch (err) {
//     res.status(500).json({ message: "Server Error", error: err.message });
//   }
// };

// // Function to update stock
// exports.updateStock = async (req, res) => {
//   try {
//     const { stock } = req.body;
//     const updatedPlant = await Plant.findByIdAndUpdate(
//       req.params.id,
//       { $set: { stock } },
//       { new: true }
//     );
//     res.json(updatedPlant);
//   } catch (err) {
//     res.status(500).json({ message: "Server Error", error: err.message });
//   }
// };
const Plant = require("../models/Plant");

exports.createPlant = async (req, res, next) => {
  try {
    const plant = new Plant(req.body);
    await plant.save();
    res.status(201).json(plant);
  } catch (err) {
    next(err);
  }
};

exports.updateStock = async (req, res, next) => {
  try {
    const { stock } = req.body;
    const updatedPlant = await Plant.findByIdAndUpdate(
      req.params.id,
      { $set: { stock } },
      { new: true }
    );
    if (!updatedPlant) {
      return res.status(404).json({ message: "Plant not found" });
    }
    res.json(updatedPlant);
  } catch (err) {
    next(err);
  }
};

// exports.getAllPlants = async (req, res, next) => {
//   try {
//     const plants = await Plant.find();
//     res.json(plants);
//   } catch (err) {
//     next(err);
//   }
// };
exports.getAllPlants = async (req, res, next) => {
  try {
    const { search } = req.query; // Look for a 'search' query parameter
    let query = {};

    if (search) {
      // If a search term is provided, create a case-insensitive regex query
      query = { name: { $regex: search, $options: "i" } };
    }

    const plants = await Plant.find(query);
    res.json(plants);
  } catch (err) {
    next(err);
  }
};

exports.deletePlant = async (req, res, next) => {
  try {
    const plant = await Plant.findByIdAndDelete(req.params.id);

    if (!plant) {
      return res.status(404).json({ message: "Plant not found" });
    }

    res.status(200).json({ message: "Plant deleted successfully" });
  } catch (err) {
    next(err); // Pass error to central handler
  }
};

exports.updatePlant = async (req, res, next) => {
  try {
    const updatedPlant = await Plant.findByIdAndUpdate(
      req.params.id, // Get the plant's ID from the URL
      { $set: req.body }, // Set the new details from the request body
      { new: true, runValidators: true } // Return the updated document and run schema validation
    );

    if (!updatedPlant) {
      return res.status(404).json({ message: "Plant not found" });
    }

    res.json(updatedPlant);
  } catch (err) {
    next(err);
  }
};
exports.getPlantById = async (req, res, next) => {
  try {
    const plant = await Plant.findById(req.params.id);
    if (!plant) {
      return res.status(404).json({ message: "Plant not found" });
    }
    res.json(plant);
  } catch (err) {
    next(err);
  }
};
exports.updatePlant = async (req, res, next) => {
  try {
    const updatedPlant = await Plant.findByIdAndUpdate(
      req.params.id, // Get the plant's ID from the URL
      { $set: req.body }, // Set the new details from the request body
      { new: true, runValidators: true } // Return the updated document and run schema validation
    );

    if (!updatedPlant) {
      return res.status(404).json({ message: "Plant not found" });
    }

    res.json(updatedPlant);
  } catch (err) {
    next(err);
  }
};
