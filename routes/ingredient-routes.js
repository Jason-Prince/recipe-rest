if (process.env.NODE_ENV !== "production") {
  require("dotenv").config();
}
const Ingredient = require("../models/ingredient-model");
const Recipe = require("../models/recipe-model");
const express = require("express");
const router = express.Router();

router.route("/create/:recipeId").post(async (req, res, next) => {
  const { name, amount } = req.body;
  const { recipeId } = req.params;
  try {
    const recipe = await Recipe.findById(recipeId);
    const ingredient = new Ingredient({ name, amount, recipeId });
    await ingredient.save();
    recipe.ingredientId.push(ingredient);
    await recipe.save();
    res.status(201).json(ingredient);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

router.route("/get").get(async (req, res, next) => {
  try {
    const ingredient = await Ingredient.find();
    res.status(200).json(ingredient);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

router.route("/get/:ingredientId").get(async (req, res, next) => {
  try {
    const { ingredientId } = req.params;
    const ingredient = await Ingredient.findById(
      ingredientId,
      (error, data) => {
        res.status(200).json(data);
      }
    );
    console.log(`Ingredient: ${ingredient}`);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

router.route("/update/:ingredientId").patch(async (req, res, next) => {
  try {
    const { body } = req;
    const { ingredientId } = req.params;
    const updatedIngredient = await Ingredient.findByIdAndUpdate(
      ingredientId,
      { $set: body },
      (error, data) => {
        res.status(200).json(data);
      }
    );
    res.json(updatedIngredient);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

router.route("/delete/:ingredientId").delete(async (req, res, next) => {
  try {
    const { ingredientId } = req.params;
    await Ingredient.findByIdAndRemove(ingredientId, (error, data) => {
      res.json({ message: "Deleted ingredient" });
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

module.exports = router;
