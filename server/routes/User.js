const express = require('express');
const userRouter = express.Router();
const passport = require('passport');
const passportConfig = require('../middleware/passport');
const JWT = require('jsonwebtoken');
const User = require('../models/User');
const Item = require('../models/Item');

const signToken = (userId) => {
  return JWT.sign(
    {
      iss: 'unihack',
      sub: userId,
    },
    'unihack',
    { expiresIn: '1h' }
  );
};

userRouter.post('/register', (req, res) => {
  const { username, password, role } = req.body;
  User.findOne({ username }, (err, user) => {
    if (err)
      res
        .status(500)
        .json({ message: { msgBody: 'Error has occurred', msgError: true } });
    if (user)
      res.status(400).json({
        message: { msgBody: 'Username is already taken', msgError: true },
      });
    else {
      const newUser = new User({ username, password, role });
      newUser.save((err) => {
        if (err)
          res.status(500).json({
            message: { msgBody: 'Error has occurred', msgError: true },
          });
        else
          res.status(201).json({
            message: {
              msgBody: 'Account successfully created',
              msgError: false,
            },
          });
      });
    }
  });
});

userRouter.post(
  '/login',
  passport.authenticate('local', { session: false }),
  (req, res) => {
    if (req.isAuthenticated()) {
      const { _id, username, role } = req.user;
      const token = signToken(_id);
      res.cookie('access_token', token, { httpOnly: true, sameSite: true });
      res.status(200).json({ isAuthenticated: true, user: { username, role } });
    }
  }
);

userRouter.get(
  '/logout',
  passport.authenticate('jwt', { session: false }),
  (req, res) => {
    res.clearCookie('access_token');
    res.json({ user: { username: '', role: '' }, success: true });
  }
);

userRouter.get(
  '/authenticated',
  passport.authenticate('jwt', { session: false }),
  (req, res) => {
    const { username, role } = req.user;
    res.status(200).json({ isAuthenticated: true, user: { username, role } });
  }
);

userRouter.get(
  '/pantry',
  passport.authenticate('jwt', { session: false }),
  (req, res) => {
    User.findById({ _id: req.user._id })
      .populate('pantry')
      .exec((err, document) => {
        if (err)
          res.status(500).json({
            message: { msgBody: 'Error has occurred 1', msgError: true },
          });
        else {
          res.status(200).json({ pantry: document.pantry, authenticate: true });
        }
      });
  }
);

userRouter.post(
  '/item',
  passport.authenticate('jwt', { session: false }),
  (req, res) => {
    const item = new Item(req.body);
    item.save((err) => {
      if (err)
        res.status(500).json({
          message: { msgBody: 'Error has occurred', msgError: true },
        });
      else {
        req.user.pantry.push(item);
        req.user.save((err) => {
          if (err)
            res.status(500).json({
              message: { msgBody: 'Error has occurred', msgError: true },
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

module.exports = userRouter;
