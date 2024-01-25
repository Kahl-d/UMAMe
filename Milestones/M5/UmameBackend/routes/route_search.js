const express = require("express");

const searchController = require("../controllers/controller_search");

const router = express.Router();

router.post("/",searchController.getRecipe);

router.post('/mixer', searchController.mixer);

module.exports = router;
