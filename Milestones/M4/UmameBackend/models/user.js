const mongoose = require("mongoose");
const uniqueValidator = require("mongoose-unique-validator");

const Schema = mongoose.Schema;

const userSchema = new Schema({
  name: { type: String },
  username: { type: String, unique: true },
  email: { type: String, unique: true },
  password: { type: String, minlength: 8 },
  // followedUsers: {type: [String], required: false},   //later replace [String] with unique user ID
  // profilePicture: {type: },
  // following
  recipeCollection: [{ name: { type: String }, recipes: [{ type: Object }] }], //turn into an array of recipes, not their ID
  recipes: [{ type: mongoose.Types.ObjectId, ref: "Recipe" }],
});

userSchema.plugin(uniqueValidator);

module.exports = mongoose.model("User", userSchema);
