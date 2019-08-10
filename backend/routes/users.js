const express = require('express');
const router = express.Router();
const { check, validationResult } = require('express-validator');
const bcrypt = require('bcryptjs');
const auth = require('../middleware/auth');

const jwt = require('jsonwebtoken');
const config = require('config');
 
const User = require('../models/User');

// @route   POST api/users
// @desc    register a user
// @access  Public

router.post('/', [
  check('name', 'Please add a name').not().isEmpty(),
  check('name', 'Name length must be less than 16 characters').isLength({ max:15 }),
  check('name', 'Your name cannot contain special chars').matches( /(?=^[a-zA-Z0-9])[a-zA-Z0-9\s]{0,}$/ ),
  check('name', 'your name must be at least 3-word long').matches( /(?=^[a-zA-Z])[a-zA-Z0-9\s]{3,}$/ ),
  check('email', 'Please type a valid email').isEmail(),
  check('password', 'Please enter a password with 6 or more characters').isLength({ min:6 })
  
], 
async (req, res) => {
  const errors = validationResult(req);

  if(!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() })
  }

  const { name, email, password, avatar, highscore, quote} = req.body;

  try{      
    let user = await User.findOne({ email: email });
    // checking with email for user duplicate
    if(user){ 
      return res.status(400).json({ msg: 'Email already exists'})
    }
    user = await User.findOne({ name: name });
    if(user){ 
      return res.status(400).json({ msg: 'User already exists'})
    }
    
    // create new user
    user = new User({
      name: name,
      email: email,
      password: password,
      avatar: avatar,
      highscore: highscore,
      quote: quote
    })

    // enctrypting the password
    const salt = await bcrypt.genSalt(10);
    // hashing the password
    user.password = await bcrypt.hash(password, salt);

    await user.save();

    // JWT +++
    // get unique ID of created user created by mongoose 
    const payload = {
      user: { 
        id: user.id 
      }
    }

    jwt.sign(payload, config.get('jwtSecret'), {
      expiresIn: 36000 // 3600 = 1h
    }, (err, token) => {
      if(err) throw err;
      res.json({ token });
    })

  } catch(err){
    console.error(err.message);
    res.status(500).send('server error');
  }
});


// UPDATE USER
router.put('/:id', auth, async (req, res) => {
  const { name, highscore, quote } = req.body;

  // game object based on submitted fields
  const userFields = {};
  if(name) userFields.name = name;
  if(highscore) userFields.highscore = highscore;
  if(quote) userFields.quote = quote;

  try{
    let user = await User.findById(req.params.id);  // find user by ID

    if(!user) return res.status(404).json({ msg: 'User ID not found' });

    // assurance that it's .this user
    // if(game.user.toString() !== req.user.id){
    //   return res.status(401).json({ msg: 'Not authorized' });
    // }

    // process the update
    user = await User.findByIdAndUpdate(
      req.params.id,
      { $set: userFields },
      { new: true });
    res.json(user); // send the updated game
    
  } catch(err){
    console.error(err.message);
    res.status(500).send('server error');
  }
});


module.exports = router;