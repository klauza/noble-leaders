const express = require('express');
const router = express.Router();

const { check, validationResult } = require('express-validator');
const bcrypt = require('bcryptjs');

const jwt = require('jsonwebtoken');
const config = require('config');
 
const User = require('../models/User');

// 1
// @route    GET api/auth
// @desc     Get logged in user
// @access   Private

router.get('/', (req, res) => {
  res.send('Get logged in user');
});

// 2
// @route    POST api/auth
// @desc     Auth user & get a token
// @access   Public

router.post('/', [
  check('email', 'Please include a valid email').isEmail(),
  check('password', 'Password is required').exists()
],
async (req, res) => {
  const errors = validationResult(req);
  if(!errors.isEmpty()){
    return res.status(400).json({ errors: errors.array() })
  }

  const {email, password} = req.body;

  try{
    // check with email if the user exists
    let user = await User.findOne({ email });
    if(!user){
      return res.status(400).json({ msg: 'Invalid Credentials'});
    }

    // check if password is correct
    const isMatch = await bcrypt.compare(password, user.password);
    if(!isMatch){
      return res.status(400).json({ msg: 'Invalid Credentials'});
    }

    const payload = {
      user: {
        id: user.id
      }
    }

    jwt.sign(payload, config.get('jwtSecret'), {
      expiresIn: 36000
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