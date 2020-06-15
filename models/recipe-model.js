const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const recipeSchema = new mongoose.Schema(
  {
    name: String,
    serving: Number,
    cookTime: String,
    instruction: String,
    ingredientId: [
      {
        type: Schema.Types.ObjectId,
        ref: "ingredient",
      },
    ],
  },
  {
    collection: "Recipes",
  }
);

module.exports = mongoose.model("recipe", recipeSchema);
