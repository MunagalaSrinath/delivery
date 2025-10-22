// // // In a new file, e.g., middleware/validation.js
// // const Joi = require("joi");

// // const plantSchema = Joi.object({
// //   name: Joi.string().min(3).required(),
// //   price: Joi.number().positive().required(),
// //   stock: Joi.number().integer().min(0).required(),
// //   category: Joi.string().optional(),
// // });

// // exports.validatePlant = (req, res, next) => {
// //   const { error } = plantSchema.validate(req.body);
// //   if (error) {
// //     return res
// //       .status(400)
// //       .json({ message: "Validation Error", details: error.details[0].message });
// //   }
// //   next();
// // };

// // // In plantRoutes.js, you would use it like this:
// // // const { validatePlant } = require('../middleware/validation');
// // // router.post('/', [authenticateToken, isAdmin, validatePlant], async (req, res) => { ... });
// const Joi = require("joi");

// // Updated to include the imageUrl field
// const plantSchema = Joi.object({
//   name: Joi.string().min(3).required(),
//   price: Joi.number().positive().required(),
//   stock: Joi.number().integer().min(0).required(),
//   category: Joi.string().allow("").optional(), // Allow empty string
//   imageUrl: Joi.string().uri().allow("").optional(), // <-- ADD THIS LINE
// });

// exports.validatePlant = (req, res, next) => {
//   const { error } = plantSchema.validate(req.body);
//   if (error) {
//     return res
//       .status(400)
//       .json({ message: "Validation Error", details: error.details[0].message });
//   }
//   next();
// };
const Joi = require("joi");

const plantSchema = Joi.object({
  name: Joi.string().min(3).required(),
  price: Joi.number().positive().required(),
  stock: Joi.number().integer().min(0).required(),
  category: Joi.string().allow("").optional(), // Allow empty string for category

  // This is the updated validation for multiple image URLs
  imageUrls: Joi.array().items(Joi.string().uri()).optional(),
});

exports.validatePlant = (req, res, next) => {
  const { error } = plantSchema.validate(req.body);
  if (error) {
    // If validation fails, send back a clear error message
    return res
      .status(400)
      .json({ message: "Validation Error", details: error.details[0].message });
  }
  next(); // If validation passes, proceed to the controller
};
