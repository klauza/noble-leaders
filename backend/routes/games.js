const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth');
const { check, validationResult } = require('express-validator');

const User = require('../models/User');
const Game = require("../models/Game");


// @route GET api/games
// @desc  get all user's games
// @access Private
router.get('/', (req, res) => {
  res.send('Get all games');
});

// @route POST api/games
// @desc  add new game
// @access Private
router.post('/', (req, res) => {
  res.send('Add a game');
});

// @route PUT api/games/:id
// @desc  update the game
// @access Private
router.get('/:id', (req, res) => {
  res.send('Update a game');
});

// @route GET api/games
// @desc  get all user's games
// @access Private
router.delete('/:id', (req, res) => {
  res.send('Delete a game');
});


module.exports = router;