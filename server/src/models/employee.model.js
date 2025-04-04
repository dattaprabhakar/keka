// server/src/models/employee.model.js
module.exports = (sequelize, Sequelize) => {
    const Employee = sequelize.define("employee", {
      employeeId: {
        type: Sequelize.STRING,
        unique: true,
        allowNull: false,
        // primaryKey: true // Often use default 'id', but employeeId is common
      },
      firstName: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      lastName: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      email: {
        type: Sequelize.STRING,
        allowNull: false,
        unique: true,
        validate: {
          isEmail: true,
        },
      },
      jobTitle: {
        type: Sequelize.STRING,
      },
      department: {
        type: Sequelize.STRING,
      },
      joiningDate: {
        type: Sequelize.DATEONLY, // Just the date, no time
      },
      // Add foreign key to User model if employees can log in
      userId: {
          type: Sequelize.INTEGER,
          references: {
              model: 'users', // Assumes a 'users' table exists
              key: 'id'
          },
          onUpdate: 'CASCADE',
          onDelete: 'SET NULL' // Or CASCADE, depending on requirements
      }
    });
  
    return Employee;
  };