const express = require('express');
const passport = require('passport');
const User = require('../models/User');
const { callFoodApi } = require('../utils/foodApi');
const Item = require('../models/Item');

const pantryRouter = express.Router();

pantryRouter.get(
  '/',
  passport.authenticate('jwt', { session: false }),
  (req, res) => {
    User.findById({ _id: req.user._id })
      .populate('pantry')
      .exec((err, document) => {
        if (err)
          res.status(500).json({
            message: { msgBody: 'Error fetching pantry', msgError: true },
          });
        else {
          res.status(200).json({ pantry: document.pantry, authenticate: true });
        }
      });
  }
);

pantryRouter.post(
  '/item',
  passport.authenticate('jwt', { session: false }),
  async (req, res) => {
    const { name } = req.body;
    const { parsed } = await callFoodApi('food', { ingr: name });
    if (parsed.length === 0) {
      res.status(500).json({
        message: { msgBody: "Can't find item", msgError: true },
      });
      return;
    }
    if (parsed.length > 1) {
      res.status(500).json({
        message: { msgBody: 'Ca', msgError: true },
      });
      return;
    }

    const { foodId, label, image } = parsed[0].food;
    const itemData = {
      name: label,
      foodId,
      img: `https://spoonacular.com/cdn/ingredients_100x100/${label.toLowerCase()}.jpg`,
    };
    const item = new Item(itemData);
    item.save((err) => {
      if (err)
        res.status(500).json({
          message: { msgBody: 'Error has occurred 1', msgError: true },
        });
      else {
        req.user.pantry.push(item);
        req.user.save((err) => {
          if (err)
            res.status(500).json({
              message: { msgBody: 'Error has occurred 2', msgError: true },
            });
          else
            res.status(200).json({
              message: {
                msgBody: 'Successfully added item',
                msgError: false,
              },
            });
        });
      }
    });
  }
);

module.exports = pantryRouter;
