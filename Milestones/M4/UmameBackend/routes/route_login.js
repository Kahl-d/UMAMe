const express = require("express");
// const { check } = require("express-validator");

const loginController = require("../controllers/controller_login");

const router = express.Router();

router.post("/", loginController.login);

module.exports = router;
