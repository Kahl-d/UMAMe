const express = require("express");

const heartController = require("../controllers/controller_heart");

const router = express.Router();

router.post("/", heartController.addHeart);

module.exports = router;