const httpError = require("../models/http_error");
const Recipe = require("../models/recipe");
const User = require("../models/user");

const createCollection = async (req, res, next) => {
  const { userID, recipeID, name } = req.body;
  
  let recipe;
  try {
    recipe = await Recipe.findById(recipeID);
  } catch (err) {
    console.log(err.stack);
    const error = new httpError(500);
    return next(error);
  }

  if (!recipe) {
    console.log("Recipe ID %s does not exist", recipeID);
    const error = new httpError(404);
    return next(error);
  }

  let user;
  try {
    user = await User.findById(userID);
  } catch (err) {
    console.log(err.stack);
    const error = new httpError(500);
    return next(error);
  }

  if (!user) {
    console.log("User ID %s does not exist", userID);
    const error = new httpError(404);
    return next(error);
  }

  user.recipeCollection.push({
    name,
    recipes: [recipe],
  });

  try {
    await user.save();
  } catch (err) {
    console.log(err.stack);
    const error = new httpError(500);
    return next(error);
  }

  res.status(201).json({ message: "Success" });
};

const updateCollection = async (req, res, next) => {
  const { userID, recipeID, collectionName } = req.body;

  let recipe;
  try {
    recipe = await Recipe.findById(recipeID);
  } catch (err) {
    console.log(err.stack);
    const error = new httpError(500);
    return next(error);
  }

  if (!recipe) {
    console.log("Recipe ID %s does not exist", recipeID);
    const error = new httpError(404);
    return next(error);
  }

  let user;
  try {
    user = await User.findById(userID);
  } catch (err) {
    console.log(err.stack);
    const error = new httpError(500);
    return next(error);
  }

  if (!user) {
    console.log("user ID %s does not exist", userID);
    const error = new httpError(404);
    return next(error);
  }


  user.recipeCollection.forEach((collection) => {
    if (collection.name === collectionName) {
      console.log(collection.name);
      collection.recipes.push(recipe);
    }
  });

  try {
    await user.save();
  } catch (err) {
    console.log(err.stack);
    const error = new httpError(500);
    return next(error);
  }

  res.status(201).json({ message: "Success" });
};

const getByID = async (req, res, next) => {
  console.log("Getting collection by ID");
  const { collectionID } = req.body;

  let collection;
  let recipes;
  try {
    collection = await Collection.findById(collectionID);
    recipes = await Recipe.find({ _id: { $in: collection.recipes } });
  } catch (err) {
    const error = new httpError(500);
    return next(error);
  }

  res.status(201).json({
    name: collection.name,
    recipes: recipes.map((recipe) => recipe.toObject({ getters: true })),
  });
};

exports.createCollection = createCollection;
exports.updateCollection = updateCollection;
exports.getByID = getByID;
