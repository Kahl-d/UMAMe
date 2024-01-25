const httpError = require("../models/http_error");
const Recipe = require("../models/recipe");
const User = require("../models/user");

const getRecipe = async (req, res, next) => {
  const { searchTerm, searchType } = req.body;

  if (!searchTerm || searchTerm.trim().length === 0) {
    const error = new httpError("Search term is missing or empty", 422);
    return next(error);
  }

  let recipes;
  try {
    if (searchType == "name") {
      recipes = await Recipe.find({ name: new RegExp(searchTerm, "i") });
    } else if (searchType == "tag") {
      recipes = await Recipe.find({ tags: new RegExp(searchTerm, "i") });
    } else if (searchType == "ingredient") {
      recipes = await Recipe.find({
        ingredients: { $elemMatch: { name: new RegExp(searchTerm, "i") } },
      });
    } else if (searchType == "user") {

      let users = await User.find({ name: new RegExp(searchTerm, "i") });
      if (!users || users.length === 0) {
        const error = new httpError("No matching users found", 404);
        return next(error);
      }

      res.json({
        users: users.map((user) => user.toObject({ getters: true })),
      });
      return;
    }

  } catch (err) {
    const error = new httpError("Error searching.", 500);
    return next(error);
  }

  if (!recipes || recipes.length === 0) {
    const error = new httpError("No matching recipes found", 404); 
    return next(error);
  }

  res.json({
    recipes: recipes.map((recipe) => recipe.toObject({ getters: true })),
  });
};

const mixer = async (req, res, next) => {
  const { ingredients } = req.body;

  if (!ingredients) {
    console.log("Empty search");
    const error = new httpError("empty search", 404);
    return next(error);
  }

  const ingredientsCaseIn = [];

  ingredients.forEach((ingredient) => {
    ingredientsCaseIn.push(ingredient.toLowerCase());
  });

  let n = ingredientsCaseIn.length + 1;
  let m = ingredientsCaseIn.length - 1;
  let queryString = `ingrMixerNames.${n}`;
  let recipes;
  try {
    recipes = await Recipe.aggregate([
      { $match: { [queryString]: { $exists: false } } },
      { $redact: { 
        $cond: [ 
            { $gte: [ 
                { $size: { $setIntersection: [ "$ingrMixerNames", ingredientsCaseIn ] } }, 
                m
            ]},
            "$$KEEP", 
            "$$PRUNE" 
        ]
    }},
    ]);
  } catch (err) {
    console.log(err.stack);
    const error = new httpError("Error searching.", 500);
    return next(error);
  }

  if (!recipes || recipes.length === 0) {
    console.log("No matching recipes found");
    const error = new httpError("No matching recipes found", 404);
    return next(error);
  }

  res.json({
    recipes: recipes
  });
};

exports.getRecipe = getRecipe;
exports.mixer = mixer;
