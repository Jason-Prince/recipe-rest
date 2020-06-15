const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const ingredientSchema = new mongoose.Schema(
  {
    name: String,
    amount: String,
    recipeId: {
      type: Schema.Types.ObjectId,
      ref: "recipe",
    },
  },
  {
    collection: "Ingredients",
  }
);

module.exports = mongoose.model("ingredient", ingredientSchema);
