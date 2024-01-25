const express = require("express");

const collectionController = require("../controllers/controller_collection");

const router = express.Router();

router.post("/create", collectionController.createCollection);

router.post("/update", collectionController.updateCollection);

router.get("/getByID", collectionController.getByID);

module.exports = router;
