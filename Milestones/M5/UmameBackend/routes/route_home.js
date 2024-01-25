const express = require("express");

const homeController = require("../controllers/controller_home");

const router = express.Router();

router.get("/", homeController.getAllRecipes);

module.exports = router;
