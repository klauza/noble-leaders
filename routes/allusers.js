const express = require('express');
const router = express.Router();
const config = require('config');
 
const User = require('../models/User');



// @route GET api/allusers
// @desc  get all users
// @access Public
router.get('/', async (req, res) => {
  try{
    const users = await User.find().select(["name", "nameSlug", "highscore", "quote", "avatar"]).sort({highscore:-1}); 
    // const users = await User.find().sort({highscore:-1}); 
    res.json(users);

  } catch(err){
    console.error(err.message);
    res.status(500).send('server error');
  }
});

// @route GET api/allusers/user/:name
// @desc  get one user
// @access Public
router.get('/user/:name', async (req, res) => {

  const userName = req.params.name;

  try{
    const user = await User.find({nameSlug: userName}); 
    res.json(user);

  } catch(err){
    console.error(err.message);
    res.status(500).send('server error');
  }
})

module.exports = router;