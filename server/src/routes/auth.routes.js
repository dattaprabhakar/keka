// server/src/routes/auth.routes.js
const controller = require("../controllers/auth.controller");
// const { verifySignUp } = require("../middleware"); // Add middleware for validation if needed

module.exports = function(app) {
  app.use(function(req, res, next) {
    res.header(
      "Access-Control-Allow-Headers",
      "x-access-token, Origin, Content-Type, Accept"
    );
    next();
  });

  // POST /api/auth/signin
  app.post("/api/auth/signin", controller.signin);

  // POST /api/auth/signup (if implementing registration)
  // app.post(
  //   "/api/auth/signup",
  //   [ /* verifySignUp.checkDuplicateUsernameOrEmail, verifySignUp.checkRolesExisted */ ],
  //   controller.signup
  // );
};