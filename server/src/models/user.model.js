// server/src/models/user.model.js
module.exports = (sequelize, Sequelize) => {
    const User = sequelize.define("users", { // Note: table name often plural 'users'
      email: {
        type: Sequelize.STRING,
        allowNull: false,
        unique: true,
        validate: {
          isEmail: true
        }
      },
      password: {
        type: Sequelize.STRING,
        allowNull: false
      },
      // Add other user fields if needed (e.g., is_active)
      // Foreign key to Employee might be here or in Employee model
    });
  
    return User;
  };