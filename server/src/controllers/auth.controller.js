// server/src/controllers/auth.controller.js
const db = require("../models");
const config = require("../config/auth.config"); // You might create this for JWT secret/expiry
const User = db.user;
const Role = db.role;
// const Employee = db.employee; // Needed if linking user to employee details on login

const Op = db.Sequelize.Op;

const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");

// You'll need a JWT_SECRET in your .env or a config file
const JWT_SECRET = process.env.JWT_SECRET || config.secret;

exports.signin = async (req, res) => {
  try {
    const user = await User.findOne({
      where: {
        email: req.body.email
      },
      include: [{ // Include roles to send back or check permissions
          model: Role,
          attributes: ['name'],
          through: { attributes: [] } // Don't include junction table attributes
      }//,
      // Optionally include Employee details if needed immediately after login
      // { model: Employee, attributes: ['id', 'firstName', 'lastName', 'employeeId'] }
      ]
    });

    if (!user) {
      return res.status(404).send({ message: "User Not found." });
    }

    const passwordIsValid = bcrypt.compareSync(
      req.body.password,
      user.password
    );

    if (!passwordIsValid) {
      return res.status(401).send({
        accessToken: null,
        message: "Invalid Password!"
      });
    }

    const token = jwt.sign({ id: user.id /* , roles: user.roles */ }, JWT_SECRET, {
      expiresIn: process.env.JWT_EXPIRES_IN || 86400 // 24 hours default
    });

    const authorities = user.roles.map(role => "ROLE_" + role.name.toUpperCase());

    // Prepare user data to send back (exclude password)
    const userData = {
        id: user.id,
        email: user.email,
        roles: authorities,
        // employeeInfo: user.employee // Include if you fetched employee data
    };

    res.status(200).send({
      user: userData, // Send user details
      accessToken: token
    });

  } catch (err) {
    res.status(500).send({ message: err.message });
  }
};

// Add signup controller if needed (requires hashing password before saving)
/*
exports.signup = async (req, res) => {
    // ... implementation ...
    // Remember to hash password: password: bcrypt.hashSync(req.body.password, 8)
    // Remember to assign default roles
};
*/