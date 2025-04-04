// server/src/models/leave_request.model.js
module.exports = (sequelize, Sequelize) => {
    const LeaveRequest = sequelize.define("leave_requests", {
      leaveType: { // e.g., 'Casual', 'Sick', 'Earned'
        type: Sequelize.STRING,
        allowNull: false,
      },
      startDate: {
        type: Sequelize.DATEONLY,
        allowNull: false,
      },
      endDate: {
        type: Sequelize.DATEONLY,
        allowNull: false,
      },
      reason: {
        type: Sequelize.TEXT,
      },
      status: { // e.g., 'Pending', 'Approved', 'Rejected', 'Cancelled'
        type: Sequelize.STRING,
        allowNull: false,
        defaultValue: 'Pending',
      },
      // Foreign Key defined via association in models/index.js
      // employeeId: Sequelize.INTEGER
      // Optional: approverId (FK to User model for manager)
      // Optional: comments (from approver)
    });
  
    return LeaveRequest;
  };