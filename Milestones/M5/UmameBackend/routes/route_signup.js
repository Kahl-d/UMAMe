const express = require("express");

const signupController = require("../controllers/controller_signup");

const router = express.Router();

router.post("/",signupController.createUser);

module.exports = router;
