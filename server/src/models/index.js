// server/src/models/index.js
const dbConfig = require("../config/db.config.js");
const Sequelize = require("sequelize");

const sequelize = new Sequelize(
  dbConfig.DB,
  dbConfig.USER,
  dbConfig.PASSWORD,
  {
    host: dbConfig.HOST,
    port: dbConfig.PORT,
    dialect: dbConfig.dialect,
    pool: dbConfig.pool,
    logging: false // Set to console.log to see SQL queries, or false for cleaner logs
  }
);

const db = {};

db.Sequelize = Sequelize;
db.sequelize = sequelize;

// Load models
db.employee = require("./employee.model.js")(sequelize, Sequelize);
db.user = require("./user.model.js")(sequelize, Sequelize); // Load User model
db.role = require("./role.model.js")(sequelize, Sequelize); // Load Role model
db.leaveRequest = require("./leave_request.model.js")(sequelize, Sequelize); // Load Leave model

// --- Define Associations ---

// User <-> Role (Many-to-Many)
db.role.belongsToMany(db.user, {
  through: "user_roles", // Junction table name
  foreignKey: "roleId",
  otherKey: "userId"
});
db.user.belongsToMany(db.role, {
  through: "user_roles",
  foreignKey: "userId",
  otherKey: "roleId"
});

// User <-> Employee (One-to-One, assuming one login per employee)
// If Employee table holds login info (like userId), the FK is defined there
// This sets up the reverse association for easier querying from User -> Employee
db.user.hasOne(db.employee, { foreignKey: 'userId', sourceKey: 'id'});
db.employee.belongsTo(db.user, { foreignKey: 'userId', targetKey: 'id'});

// Employee <-> LeaveRequest (One-to-Many)
db.employee.hasMany(db.leaveRequest, { as: "leaveRequests", foreignKey: 'employeeId' });
db.leaveRequest.belongsTo(db.employee, {
  foreignKey: "employeeId",
  as: "employee", // Alias to access employee from leave request
});

// Optional: Add associations for Leave Approvers (e.g., Manager User <-> LeaveRequest)

db.ROLES = ["employee", "manager", "admin"]; // Define role names

module.exports = db;