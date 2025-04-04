// server/src/routes/employee.routes.js
const employees = require("../controllers/employee.controller.js");
const { verifyToken, isAdmin } = require("../middleware/authJwt"); // Example auth middleware
const router = require("express").Router();

// Apply authentication middleware to all employee routes
// Adjust permissions as needed (e.g., maybe employees can view profiles)
router.use(verifyToken);

// Define routes
router.post("/", [isAdmin], employees.create); // Only Admin can create
router.get("/", employees.findAll); // All authenticated users can view list (adjust as needed)
router.get("/:id", employees.findOne); // All authenticated users can view detail (adjust as needed)
// router.put("/:id", [isAdmin], employees.update); // Only Admin can update
// router.delete("/:id", [isAdmin], employees.delete); // Only Admin can delete

module.exports = router;