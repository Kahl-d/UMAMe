// const { v4: uuid } = require("uuid");
const httpError = require("../models/http_error");
const Recipe = require("../models/recipe");

const addHeart = async (req, res, next) => {
  const { recipeID } = req.body;

  let recipe;
  try {
    recipe = await Recipe.updateOne({ _id: recipeID }, { $inc: { hearts: 1 } });
  } catch (err) {
    console.log(err.stack);
    const error = new httpError("Could not find recipe", 500);
    return next(error);
  }

  res.status(201).json({ message: "success" });
};

exports.addHeart = addHeart;
