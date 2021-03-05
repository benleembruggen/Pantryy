
const { callFoodApi } = require('../utils/foodApi');
const express = require('express');
const passport = require('passport');


const itemRouter = express.Router();

itemRouter.get(
  '/search',
  passport.authenticate('jwt', { session: false }),
  async (req, res) => {
    const data = await callFoodApi('food', { ingr: 'TODO: REPLACE' });
    res.json(data);
  }
);


module.exports = itemRouter;
