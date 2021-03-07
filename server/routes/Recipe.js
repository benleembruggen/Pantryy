
const { callFoodApi } = require('../utils/foodApi');
const express = require('express');
const User = require('../models/User');
const passport = require('passport');


const recipeRouter = express.Router();

recipeRouter.get(
  '/search',
  passport.authenticate('jwt', { session: false }),
  async (req, res) => {
    const { name, requireAllIngredientsAvailable } = req.query;
    const { hits } = await callFoodApi('recipeSearch', { q: name, to: 32 });


    if (!requireAllIngredientsAvailable) {
      res.json(hits);
      return;
    }

    // We need to filter recipes to those we can make with our current ingredients
    const { pantry } = await User.findById({ _id: req.user._id }).populate('pantry');
    const pantryFoodIds = pantry.map(({ foodId }) => foodId);

    const filteredResults = hits.filter(({ recipe }) => recipe.ingredients.every(({ foodId }) => pantryFoodIds.includes(foodId)));
    res.json(filteredResults);
  }
);


module.exports = recipeRouter;
