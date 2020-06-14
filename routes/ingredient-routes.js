if (process.env.NODE_ENV !== "production") {
  require("dotenv").config();
}
const Ingredient = require("../models/ingredient-model");
const express = require("express");
const router = express.Router();

router.route("/create").post(async (req, res, next) => {
  try {
    const { name, amount } = req.body;
    const ingredient = new Ingredient({ name, amount });
    const newIngredient = await ingredient.save();
    res.status(201).json(newRecipe);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

router.route("/get").get(async (req, res, next) => {
  try {
    const ingredient = await Ingredient.find();
    res.status(200).json(recipe);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

router.route("/get/:id").get(async (req, res, next) => {
  try {
    const { id } = req.params;
    const ingredient = await Ingredient.findById(id, (error, data) => {
      res.status(200).json(data);
    });
    console.log(`Ingredient: ${ingredient}`);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

router.route("/update/:id").patch(async (req, res, next) => {
  try {
    const { body } = req;
    const { id } = req.params;
    const updatedIngredient = await Ingredient.findByIdAndUpdate(
      id,
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

router.route("/delete/:id").delete(async (req, res, next) => {
  try {
    const { id } = req.params;
    await Ingredient.findByIdAndRemove(id, (error, data) => {
      res.json({ message: "Deleted ingredient" });
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

module.exports = router;
