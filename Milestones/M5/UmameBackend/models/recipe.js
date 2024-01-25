const mongoose = require("mongoose");
const uniqueValidator = require("mongoose-unique-validator");

const Schema = mongoose.Schema;

const recipeSchema = new Schema({
  name: { type: String },
  ingredients: [
    {
      name: { type: String },
      amount: { type: Number },
      unit: { type: String },
    },
  ],
  recipeOwner: { type: mongoose.Types.ObjectId, ref: "User" },
  recipeOwnerName: { type: String },
  comments: [
    {
      commentOwner: { type: String },
      content: { type: String },
      hearts: {type: Number},
    },
  ],
  hearts: { type: Number },
  tags: { type: [String] },
  dateCreated: { type: Date },
  instructions: [
    {
      text: { type: String },
      minute: { type: Number },
      second: { type: Number },
    },
  ],
  additionalComment: { type: String },
  difficulty: { type: Number },
  image: {type: String},
  ingrMixerNames: [{type: String}],
  isQuickPost: {}
});

recipeSchema.plugin(uniqueValidator);

module.exports = mongoose.model("Recipe", recipeSchema);
