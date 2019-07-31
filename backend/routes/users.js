const express = require('express');
const router = express.Router();
const { check, validationResult } = require('express-validator');
const bcrypt = require('bcryptjs');

const jwt = require('jsonwebtoken');
const config = require('config');
 
const User = require('../models/User');

// @route   POST api/users
// @desc    register a user
// @access  Public

router.post('/', [
  check('name', 'Please add a name').not().isEmpty(),
  check('email', 'Please type a valid email').isEmail(),
  check('password', 'Please enter a password with 6 or more characters').isLength({ min:6 })
], 
async (req, res) => {
  const errors = validationResult(req);

  if(!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() })
  }

  const { name, email, password} = req.body;

  try{      
    let user = await User.findOne({ email: email });
    // checking for user duplicate
    if(user){ 
      return res.status(400).json({ msg: 'User already exists'})
    }

    // create new user
    user = new User({
      name: name,
      email: email,
      password: password
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

module.exports = router;