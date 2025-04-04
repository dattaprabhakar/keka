// server/src/middleware/authJwt.js
const jwt = require("jsonwebtoken");
const db = require("../models");
const User = db.user; // Assuming a User model linked to roles

const verifyToken = (req, res, next) => {
  let token = req.headers["x-access-token"] || req.headers["authorization"];

  if (!token) {
    return res.status(403).send({ message: "No token provided!" });
  }

  // If token is Bearer token
  if (token.startsWith('Bearer ')) {
    token = token.slice(7, token.length);
  }

  jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
    if (err) {
      return res.status(401).send({ message: "Unauthorized! Invalid Token." });
    }
    req.userId = decoded.id; // Add user ID to the request object
    next();
  });
};

// Example Role Check (requires User model to have getRoles method from association)
const isAdmin = async (req, res, next) => {
  try {
    const user = await User.findByPk(req.userId);
    const roles = await user.getRoles(); // Assumes many-to-many User-Role setup

    for (let i = 0; i < roles.length; i++) {
      if (roles[i].name === "admin") {
        return next(); // User is admin, proceed
      }
    }

    return res.status(403).send({ message: "Require Admin Role!" });
  } catch (error) {
     return res.status(500).send({ message: "Unable to validate User role!" });
  }
};

// Add similar checks for 'isManager', etc.

module.exports = {
  verifyToken,
  isAdmin,
  // isManager,
};