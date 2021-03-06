const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth');

const Game = require("../models/Game");


// @route GET api/games/all
// @desc  get all games for statistics
// @access Public
router.get('/all', async (req, res) => {
  try{
    const games = await Game.find().select(["name", "attempts", "rating"]);
    res.json(games);

  } catch(err){
    console.error(err.message);
    res.status(500).send('server error');
  }
})

// @route GET api/games/:userId
// @desc  get all user's games
// @access Private
router.get('/:userId', async (req, res) => {
  const userId = req.params.userId;

  try{
    const publicGames = await Game.find({ user: userId }).select(["name", "score", "rating", "attempts"]).sort({ date: -1 });
    res.json(publicGames);

  }catch(err){
    console.error(err.message);
    res.status(500).send('server error');
  }
})

// @route GET api/games
// @desc  get all user's games
// @access Private
router.get('/', auth, async (req, res) => {
  try{
    const games = await Game.find({ user: req.user.id }).sort({ date: -1 }); // -1 = most recent first
    res.json(games);

  } catch(err){
    console.error(err.message);
    res.status(500).send('server error');
  }
});

// @route POST api/games
// @desc  add new game
// @access Private
router.post('/', auth, async (req, res) => {

  const { name, score, rating, attempts } = req.body;

  try{
    const newGame = new Game({
      name,
      score,
      rating,
      attempts,
      user: req.user.id   // from auth middleware
    });

    const game = await newGame.save();
    res.json(game);

  } catch(err){
    console.error(err.message);
    res.status(500).send('server error');
  }
});

// @route PUT api/games/:id
// @desc  update the game
// @access Private
router.put('/:id', auth, async (req, res) => {
  const { name, score, rating, attempts } = req.body;

  // game object based on submitted fields
  const gameFields = {};
  if(name) gameFields.name = name;
  if(score) gameFields.score = score;
  if(rating) gameFields.rating = rating;
  if(attempts) gameFields.attempts = attempts;

  try{
    let game = await Game.findById(req.params.id);  // find game by ID

    if(!game) return res.status(404).json({ msg: 'Game not found' });

    // assurance that it's .this user's game details
    if(game.user.toString() !== req.user.id){
      return res.status(401).json({ msg: 'Not authorized' });
    }

    // process the update
    game = await Game.findByIdAndUpdate(
      req.params.id,
      { $set: gameFields },
      { new: true });
    res.json(game); // send the updated game

  } catch(err){
    console.error(err.message);
    res.status(500).send('server error');
  }
});

// @route DELETE api/games/:id
// @desc  delete user's game
// @access Private
router.delete('/:id', auth, async (req, res) => {

  try{
    let game = await Game.findById(req.params.id);
    
    if(!game) return res.status(404).json({ msg: 'Game not found'});

    // assurance that it's .this user's game details
    if(game.user.toString() !== req.user.id){
      return res.status(401).json({ msg: 'Not authorized' });
    }

    await Game.findByIdAndRemove(req.params.id);  // removes the whole game object

    res.json({ msg: 'Game removed' });
    
  } catch(err){
    console.error(err.message);
    res.status(500).send('server error');
  }
});


module.exports = router;