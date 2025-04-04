// server/src/models/role.model.js
module.exports = (sequelize, Sequelize) => {
    const Role = sequelize.define("roles", {
      id: { // Explicitly define ID for roles if using standard names like 'employee', 'admin'
        type: Sequelize.INTEGER,
        primaryKey: true
      },
      name: {
        type: Sequelize.STRING,
        allowNull: false,
        unique: true
      }
    });
  
    return Role;
  };