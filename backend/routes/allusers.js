const express = require('express');
const router = express.Router();
const config = require('config');
 
const User = require('../models/User');



// @route GET api/allusers
// @desc  get all users
// @access Public
router.get('/', async (req, res) => {
  try{
    const users = await User.find().sort({highscore:-1}); 
    res.json(users);

  } catch(err){
    console.error(err.message);
    res.status(500).send('server error');
  }
});

module.exports = router;