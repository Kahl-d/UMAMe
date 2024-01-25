const express = require("express");
const { check } = require("express-validator");

const signupController = require("../controllers/controller_signup");

const router = express.Router();

router.post(
  "/",
  // [
    // check("firstName").not().isEmpty(),
    // check("lastName").not().isEmpty(),
    // check("username").not().isEmpty(),
  //   check("name").not().isEmpty(),
  //   check("email").normalizeEmail().isEmail(),
  //   check("password").isLength({ min: 8 }),
  //   check("age").not().isEmpty()
  // ],
  signupController.createUser
);

module.exports = router;
