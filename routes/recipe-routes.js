if (process.env.NODE_ENV !== "production") {
  require("dotenv").config();
}
const Recipe = require("../models/recipe-model");
const express = require("express");
const router = express.Router();

router.route("/create").post(async (req, res, next) => {
  const { name, serving, cookTime, instruction } = req.body;
  try {
    const recipe = new Recipe({ name, serving, cookTime, instruction });
    await recipe.save();
    res.status(201).json(recipe);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

router.route("/get").get(async (req, res, next) => {
  try {
    const recipe = await Recipe.find();
    res.status(200).json(recipe);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

router.route("/get/:recipeId").get(async (req, res, next) => {
  const { recipeId } = req.params;
  try {
    const recipe = await Recipe.findById(recipeId);
    res.status(200).json(recipe);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

router.route("/update/:recipeId").patch(async (req, res, next) => {
  const { body } = req;
  const { recipeId } = req.params;
  try {
    await Recipe.findByIdAndUpdate(
      recipeId,
      {
        $set: body,
      },
      (error, data) => {
        res.status(200).json({ message: "Updated" });
      }
    );
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

router.route("/delete/:recipeId").delete(async (req, res, next) => {
  const { recipeId } = req.params;
  try {
    await Recipe.findByIdAndRemove(recipeId);
    res.json({ message: "Deleted recipe" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

module.exports = router;
