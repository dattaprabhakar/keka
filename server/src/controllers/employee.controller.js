// server/src/controllers/employee.controller.js
const db = require("../models"); // Loads models/index.js
const Employee = db.employee;
const Op = db.Sequelize.Op; // For search operators

// Get all employees (with basic pagination/search)
exports.findAll = async (req, res) => {
  const { page = 1, size = 10, search = '' } = req.query;
  const limit = parseInt(size);
  const offset = (parseInt(page) - 1) * limit;

  const condition = search
    ? {
        [Op.or]: [
          { firstName: { [Op.iLike]: `%${search}%` } }, // Case-insensitive search
          { lastName: { [Op.iLike]: `%${search}%` } },
          { email: { [Op.iLike]: `%${search}%` } },
          { employeeId: { [Op.iLike]: `%${search}%` } },
        ],
      }
    : null;

  try {
    const data = await Employee.findAndCountAll({
        where: condition,
        limit,
        offset,
        order: [['lastName', 'ASC'], ['firstName', 'ASC']] // Example sorting
    });
    res.send({
        totalItems: data.count,
        employees: data.rows,
        totalPages: Math.ceil(data.count / limit),
        currentPage: parseInt(page)
    });
  } catch (err) {
    res.status(500).send({ message: err.message || "Error retrieving employees." });
  }
};

// Get single employee by ID (using the primary key 'id', not employeeId here)
exports.findOne = async (req, res) => {
  const id = req.params.id;

  try {
    const employee = await Employee.findByPk(id);
    if (employee) {
      res.send(employee);
    } else {
      res.status(404).send({ message: `Cannot find Employee with id=${id}.` });
    }
  } catch (err) {
    res.status(500).send({ message: `Error retrieving Employee with id=${id}` });
  }
};

// Create a new Employee (simplified - needs more validation)
exports.create = async (req, res) => {
    // Basic validation
    if (!req.body.firstName || !req.body.lastName || !req.body.email || !req.body.employeeId) {
        return res.status(400).send({ message: "Required fields are missing!" });
    }

    const employeeData = {
        firstName: req.body.firstName,
        lastName: req.body.lastName,
        email: req.body.email,
        employeeId: req.body.employeeId,
        jobTitle: req.body.jobTitle,
        department: req.body.department,
        joiningDate: req.body.joiningDate,
        // Potentially link to a user account here if needed
    };

    try {
        const employee = await Employee.create(employeeData);
        res.status(201).send(employee);
    } catch (err) {
         // Handle potential unique constraint errors (like duplicate email/employeeId)
         if (err.name === 'SequelizeUniqueConstraintError') {
            return res.status(409).send({ message: "Email or Employee ID already exists." });
        }
        res.status(500).send({ message: err.message || "Error creating employee." });
    }
};

// ... other CRUD operations (update, delete)