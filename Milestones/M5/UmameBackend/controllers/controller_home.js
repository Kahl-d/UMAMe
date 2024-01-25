const httpError = require("../models/http_error");
const Recipe = require("../models/recipe");

const getAllRecipes = async (_req, res, next) => {
  let recipes;
  try {
    recipes = await Recipe.find({}).sort({ dateCreated: -1 });
  } catch (err) {
    console.log("Could not retrieve recipe names from database.");
    const error = new httpError(
      "Could not retrieve recipe names from database.",
      500
    );
    return next(error);
  }

  res.json({
    recipes: recipes.map((recipe) => recipe.toObject({ getters: true })),
  });
};

exports.getAllRecipes = getAllRecipes;
