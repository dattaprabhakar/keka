// server/server.js
require('dotenv').config(); // Load .env variables
const express = require("express");
const cors = require("cors");
const db = require("./src/models"); // This runs models/index.js

const app = express();

// --- Middleware ---
// Enable CORS for frontend requests (configure origins for production)
app.use(cors({ origin: process.env.CLIENT_URL || "http://localhost:3000" }));
// Parse JSON request bodies
app.use(express.json());
// Parse URL-encoded request bodies
app.use(express.urlencoded({ extended: true }));

// --- Database Sync ---
// In development, you might use sync({ force: true }) to drop and re-sync DB.
// For production, use migrations instead.
db.sequelize.sync() // Consider db.sequelize.sync({ alter: true }) for non-destructive updates during dev
  .then(() => {
    console.log("Synced db.");
    // initial(); // Optional function to populate initial data (like roles)
  })
  .catch((err) => {
    console.log("Failed to sync db: " + err.message);
  });

// --- Routes ---
app.get("/", (req, res) => {
  res.json({ message: "Welcome to Keka Clone API." });
});

// Import and use route handlers
require("./src/routes/auth.routes")(app); // Pass app instance
require("./src/routes/employee.routes")(app); // Pass app instance
require("./src/routes/leave.routes")(app); // Pass app instance

// --- Start Server ---
const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}.`);
});

// --- Example: Function to add initial roles (call after sync if needed) ---
/*
async function initial() {
  try {
    const Role = db.role; // Assuming you have a Role model
    const count = await Role.count();
    if (count === 0) {
        await Role.create({ id: 1, name: "employee" });
        await Role.create({ id: 2, name: "manager" });
        await Role.create({ id: 3, name: "admin" });
        console.log("Added initial roles to DB.");
    }
  } catch (error) {
      console.error("Error adding initial roles:", error);
  }
}
*/