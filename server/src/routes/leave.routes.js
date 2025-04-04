// server/src/routes/leave.routes.js
const controller = require("../controllers/leave.controller.js");
const { verifyToken /*, isManager, isAdmin */ } = require("../middleware/authJwt");
const router = require("express").Router();

// Apply authentication middleware to all leave routes
router.use(verifyToken);

// Define routes
router.post("/", controller.create);           // Employee creates a request
router.get("/my", controller.findMyRequests);   // Employee views their own requests

// Example routes for managers/admins (requires role checks)
// router.get("/", [isManagerOrAdmin], controller.findAll); // Manager/Admin views all requests (needs findAll impl)
// router.get("/:id", [isManagerOrAdmin], controller.findOne); // Manager/Admin views specific request
// router.put("/:id/status", [isManager], controller.updateStatus); // Manager approves/rejects

module.exports = router; // Export the router instance