const express = require('express');
const router = express.Router();
const { check, validationResult } = require('express-validator');
const auth = require('../middleware/auth');

const Comment = require('../models/ForumComment');

// 1
// @route GET api/comments
// @desc  get all existing comments
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

// 3
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

// 4 
// @route PUT api/comments/:id
// @desc  update a certain forum comment by id
// @access Private
router.put('/:id', auth, async (req, res) => {
  const { content } = req.body;
  let date = new Date();
  let edited = true;

  //submitted attrs by user
  const updateFields = {};
  if(content) updateFields.content = content;
  updateFields.date = date
  updateFields.edited = edited

  try{
    let comment = await Comment.findById(req.params.id);  // find topic by ID
    if(!comment) return res.status(404).json({ msg: 'Comment not found' });

    // process the update
    comment = await Comment.findByIdAndUpdate(
      req.params.id,
      { $set: updateFields },
      { new: true }
    );
    res.json(comment); // send the updated game

  }catch(err){
    console.error(err.message);
    res.status(500).send('server error');
  }
})

// 5
// @route DELETE api/comments/:id
// @desc  delete a comment by id
// @access Private
router.delete('/:id', auth, async (req, res) => {

  try{
    let comment = await Comment.findById(req.params.id);
    
    if(!comment) return res.status(404).json({ msg: 'Comment not found'});

    await Comment.findByIdAndRemove(req.params.id);  // removes the whole game object

    res.json({ msg: 'Comment removed' });
    
  } catch(err){
    console.error(err.message);
    res.status(500).send('server error');
  }
});


module.exports = router;