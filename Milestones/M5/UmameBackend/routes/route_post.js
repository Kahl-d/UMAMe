const express = require("express");

const postController = require("../controllers/controller_post");
const fileUpload = require("../middleware/file_upload");

const router = express.Router();

router.post("/", fileUpload.single('image'), postController.createRecipe);

router.post("/comment", postController.comment);

router.post("/populate", postController.populate);

module.exports = router;
