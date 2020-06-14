const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const ingredientSchema = new mongoose.Schema(
  {
    name: String,
    amount: Number,
    recipe: [
      {
        type: Schema.Types.ObjectId,
        ref: "recipe",
      },
    ],
  },
  {
    collection: "ingredient",
  }
);

module.exports = mongoose.model("ingredient", ingredientSchema);
