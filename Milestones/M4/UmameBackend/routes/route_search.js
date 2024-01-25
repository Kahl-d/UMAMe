const express = require("express");
const { check } = require("express-validator");

const searchController = require("../controllers/controller_search");

const router = express.Router();

router.post(
    "/",
    // [
    //     check("searchTerm").not().isEmpty(),
    // ],
    searchController.getRecipe
);

router.post('/mixer', searchController.mixer);

module.exports = router;
