const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const recipeSchema = new mongoose.Schema(
  {
    name: String,
    serving: Number,
    cookTime: String,
    instruction: String,
    ingredient: [
      {
        type: Schema.Types.ObjectId,
        ref: "ingredient",
      },
    ],
  },
  {
    collection: "recipe",
  }
);

module.exports = mongoose.model("recipe", recipeSchema);
