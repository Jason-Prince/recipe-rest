// Only use dotenv in development
if (process.env.NODE_ENV !== "production") {
  require("dotenv").config();
}

// Requires
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const recipeRoutes = require("./routes/recipe-routes");
const ingredientRoutes = require("./routes/ingredient-routes");

// MongoDB
const db = mongoose.connection;
mongoose.connect(process.env.ATLAS_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useFindAndModify: false,
  useCreateIndex: true,
});
db.on("error", (error) => console.error(error));
db.once("open", () => console.log("Connected to Database"));

// Express
const app = express(); // Initialize express as app
// Not sure if I need cors when using heroku
app.use(cors()); // Allows Cross-Origin Resource Sharing
app.use(express.json()); // Parse JSON bodies
app.use(express.urlencoded({ extended: false })); // Pass data from forms to req.body
app.use("/recipes", recipeRoutes);
app.use("/ingredients", ingredientRoutes);
const port = process.env.PORT || 6000; // PORT set to 4000
app.listen(port, () => console.log(`Server running on port: ${port}`));
