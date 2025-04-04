// server/src/controllers/leave.controller.js
const db = require("../models");
const LeaveRequest = db.leaveRequest;
const Employee = db.employee; // Might need Employee to link request to user
const User = db.user; // Might need user to get employeeId

// Get leave requests (e.g., for the logged-in user)
exports.findMyRequests = async (req, res) => {
    try {
        // 1. Get logged-in user ID from token (added by authJwt middleware)
        const userId = req.userId;

        // 2. Find the associated employee (assuming User.id links to Employee.userId)
        const employee = await Employee.findOne({ where: { userId: userId } });
        if (!employee) {
            return res.status(404).send({ message: "Employee profile not found for this user." });
        }

        // 3. Find leave requests for that employee
        const requests = await LeaveRequest.findAll({
            where: { employeeId: employee.id },
            order: [['startDate', 'DESC']] // Example ordering
            // Include employee details if needed, though redundant here
            // include: [{ model: Employee, as: 'employee' }]
        });

        res.status(200).send(requests);
    } catch (err) {
        res.status(500).send({ message: err.message || "Error retrieving leave requests." });
    }
};

// Create a new leave request
exports.create = async (req, res) => {
     try {
        // 1. Get logged-in user ID
        const userId = req.userId;

         // 2. Find the associated employee
        const employee = await Employee.findOne({ where: { userId: userId } });
        if (!employee) {
            return res.status(404).send({ message: "Employee profile not found for this user." });
        }

        // 3. Validate input (add more robust validation!)
        const { leaveType, startDate, endDate, reason } = req.body;
        if (!leaveType || !startDate || !endDate) {
             return res.status(400).send({ message: "Leave type, start date, and end date are required." });
        }
        // TODO: Add date validation (endDate >= startDate), check leave balance, etc.

        // 4. Create the request
        const leaveRequest = await LeaveRequest.create({
            leaveType,
            startDate,
            endDate,
            reason,
            status: 'Pending', // Default status
            employeeId: employee.id // Link to the employee
        });

        res.status(201).send(leaveRequest);
    } catch (err) {
        res.status(500).send({ message: err.message || "Error creating leave request." });
    }
};

// Add other CRUD operations (findById, updateStatus [for managers], cancel [for employees])