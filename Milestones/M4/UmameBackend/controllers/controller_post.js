const fs = require("fs");

const Recipe = require("../models/recipe");
const User = require("../models/user");
const httpError = require("../models/http_error");
const getRandomRecipe = require("../util/populateRecipe");
const { default: mongoose } = require("mongoose");
const imgBB = require("imgbb-uploader");

const createRecipe = async (req, res, next) => {
  const {
    name,
    ingredients,
    recipeOwner,
    tags,
    instructions,
    additionalComment,
    difficulty,
  } = req.body;

  let user;
  try {
    user = await User.findById(recipeOwner);
  } catch (err) {
    const error = new httpError(500);
    return next(error);
  }

  if (!user) {
    console.log("User ID %s does not exist", recipeOwner);
    const error = new httpError(404);
    return next(error);
  }

  let ingrMixerNames = [];
  if (ingredients) {
    ingredients.forEach((ingredient) => {
      ingrMixerNames.push(ingredient.name);
    });
  }
  
  const newRecipe = new Recipe({
    name,
    ingredients,
    recipeOwner,
    recipeOwnerName: user.name,
    hearts: 0,
    tags,
    dateCreated: new Date(),
    instructions,
    additionalComment,
    difficulty,
    ingrMixerNames,
  });

  if (req.file) {
    const response = await imgBB(
      "7ad8bd3515d91e2175d53e01a5f39163",
      req.file.path
    ).catch((err) => {
      console.error(err);
      const error = new httpError(500);
      return next(error);
    });
    newRecipe.image = response.url;

    fs.unlinkSync(req.file.path, (err) => {
      console.log(err);
    });
  }

  try {
    const sess = await mongoose.startSession();
    sess.startTransaction();
    await newRecipe.save({ session: sess });
    user.recipes.push(newRecipe);
    await user.save({ session: sess });
    await sess.commitTransaction();
  } catch (err) {
    console.log(err.stack);
    const error = new httpError(500);
    return next(error);
  }

  res.status(201).json({ message: "Success" });
};

const populate = async (req, res, next) => {
  const { query } = req.body;
  let data;
  try {
    data = await getRandomRecipe(query);
  } catch (err) {
    console.log(err.stack);
    const error = new httpError(500);
    return next(error);
  }

  data.forEach(async (element) => {
    const ingredients = element.ingredients.split("|");
    const instructions = element.instructions.split(".");
    const newRecipe = new Recipe({
      name: element.title,
      ingredients: [],
      hearts: 0,
      recipeOwner: "653863f418af69c21be593db",
      recipeOwnerName: "Umame",
      dateCreated: new Date(),
      instructions: [],
    });

    let i = 0;
    ingredients.forEach((ingredient) => {
      const newIngredient = new Object({
        name: ingredient,
      });
      newRecipe.ingredients.push(newIngredient);
      i++;
    });

    i = 0;
    instructions.forEach((instruction) => {
      const newInstruction = new Object({
        text: instruction,
      });
      newRecipe.instructions.push(newInstruction);
      i++;
    });

    try {
      console.log(JSON.stringify(newRecipe));
      await newRecipe.save();
    } catch (err) {
      console.log("Could not create recipe");
      const error = new httpError(500);
      return next(error);
    }
  });

  res.status(201).json({ message: "Success" });
};

exports.createRecipe = createRecipe;
exports.populate = populate;
