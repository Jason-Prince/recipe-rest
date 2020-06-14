if (process.env.NODE_ENV !== "production") {
  require("dotenv").config();
}
const Recipe = require("../models/recipe-model");
const express = require("express");
const router = express.Router();

router.route("/create").post(async (req, res, next) => {
  const recipe = new Recipe({
    name: req.body.name,
    serving: req.body.serving,
    cookTime: req.body.cookTime,
    instruction: req.body.instruction,
  });
  try {
    const newRecipe = await recipe.save();
    res.status(201).json(newRecipe);
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

router.route("/get/:id").get(async (req, res, next) => {
  try {
    const { id } = req.params;
    const recipe = await Recipe.findById(id, (error, data) => {
      res.status(200).json(data);
    });
    console.log(`Recipe: ${recipe}`);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

router.route("/update/:id").patch(async (req, res, next) => {
  try {
    const { body } = req;
    const { id } = req.params;
    const updatedRecipe = await Recipe.findByIdAndUpdate(
      id,
      { $set: body },
      (error, data) => {
        res.status(200).json(data);
      }
    );
    res.json(updatedRecipe);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

router.route("/delete/:id").delete(async (req, res, next) => {
  try {
    const { id } = req.params;
    await Recipe.findByIdAndRemove(id, (error, data) => {
      res.json({ message: "Deleted recipe" });
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

module.exports = router;
