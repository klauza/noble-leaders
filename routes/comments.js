const express = require('express');
const router = express.Router();
const { check, validationResult } = require('express-validator');
const auth = require('../middleware/auth');

const Comment = require('../models/ForumComment');

// 1
// @route GET api/comments
// @desc  get all comments
// @access Public
router.get('/', async (req, res) => {
  try{
    const comments = await Comment.find();
    res.json(comments);

  } catch(err){
    console.error(err.message);
    res.status(500).send('server error');
  }
})

// 2
// @route POST api/comments/:idOfTopic
// @desc  create new comment in certain topic
// @access Private
router.post('/:id', [auth, [
  check('content', 'Please add a content').not().isEmpty(),
]],
async (req, res) => {
  console.log(req.body);
  const errors = validationResult(req);

  if(!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() })
  }

  const { author, slugAuthor, content } = req.body;
 
  try{
    
    const newComment = new Comment({
      author,
      slugAuthor,
      content,
      topic: req.params.id 
    });

    const comm = await newComment.save();
    res.json(comm);

  }catch(err){
    console.error(err.message);
    res.status(500).send('server error');
  }

})

// 1
// @route GET api/comments/:idOfTopic
// @desc  get all comments of a certain topic
// @access Private
router.get('/:id', auth, async (req, res) => {
  try{
    const comments = await Comment.find({ topic: req.params.id }).sort({ date: -1 }); // -1 = most recent first
    res.json(comments);

  } catch(err){
    console.error(err.message);
    res.status(500).send('server error');
  }
})

module.exports = router;