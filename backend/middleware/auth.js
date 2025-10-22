// // const jwt = require("jsonwebtoken");

// // /**
// //  * Middleware to verify the JWT from the Authorization header.
// //  * If the token is valid, it decodes the payload (user id and role)
// //  * and attaches it to the request object as `req.user`.
// //  */
// // function authenticateToken(req, res, next) {
// //   const authHeader = req.headers["authorization"];
// //   const token = authHeader && authHeader.split(" ")[1]; // Format: "Bearer TOKEN"

// //   if (token == null) {
// //     return res.sendStatus(401); // Unauthorized: No token provided
// //   }

// //   jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
// //     if (err) {
// //       return res.sendStatus(403); // Forbidden: Token is invalid or expired
// //     }
// //     req.user = user; // Attach user payload to the request
// //     next(); // Proceed to the next middleware or route handler
// //   });
// // }

// // /**
// //  * Middleware to check if the authenticated user has the 'admin' role.
// //  * This should always be used *after* authenticateToken.
// //  */
// // function isAdmin(req, res, next) {
// //   if (req.user.role !== "admin") {
// //     return res.status(403).json({ message: "Access denied. Admins only." });
// //   }
// //   next(); // User is an admin, proceed
// // }

// // // Export the functions to be used in other files
// // module.exports = {
// //   authenticateToken,
// //   isAdmin,
// // };
// const jwt = require("jsonwebtoken");

// function authenticateToken(req, res, next) {
//   const authHeader = req.headers["authorization"];
//   const token = authHeader && authHeader.split(" ")[1];

//   if (token == null) {
//     return res.sendStatus(401);
//   }

//   jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
//     if (err) {
//       return res.sendStatus(403);
//     }
//     req.user = user;
//     next();
//   });
// }

// function isAdmin(req, res, next) {
//   if (req.user.role !== "admin") {
//     return res.status(403).json({ message: "Access denied. Admins only." });
//   }
//   next();
// }

// module.exports = {
//   authenticateToken,
//   isAdmin,
// };
const jwt = require("jsonwebtoken");

/**
 * Middleware to verify the JWT from the Authorization header.
 * This is the corrected and more robust version.
 */
function authenticateToken(req, res, next) {
  const authHeader = req.headers["authorization"];
  const token = authHeader && authHeader.split(" ")[1]; // Format: "Bearer TOKEN"

  if (token == null) {
    return res.status(401).json({ message: "No token provided." });
  }

  jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
    if (err) {
      console.error("JWT Verification Error:", err.message);
      return res.status(403).json({ message: "Token is invalid or expired." });
    }

    // The 'user' payload from jwt.verify is the decoded token.
    // We attach it directly to the request object.
    req.user = user;

    next(); // Proceed to the next middleware or route handler
  });
}

/**
 * Middleware to check if the authenticated user has the 'admin' role.
 * This should always be used *after* authenticateToken.
 */
function isAdmin(req, res, next) {
  // Check if req.user was attached and has a role property
  if (!req.user || req.user.role !== "admin") {
    return res.status(403).json({ message: "Access denied. Admins only." });
  }
  next(); // User is an admin, proceed
}

module.exports = {
  authenticateToken,
  isAdmin,
};
