const express = require('express');
const router = express.Router();
const { check, validationResult } = require('express-validator');
const auth = require('../middleware/auth');

const ForumTopic = require("../models/ForumTopic");

// 1 
// @route POST api/forum
// @desc  post a forum topic
// @access Private
router.post('/', [auth, [
  check('subject', 'Please add a subject').not().isEmpty(),
  check('description', 'Please add a description').not().isEmpty(),
  check('content', 'Please add a content').not().isEmpty()
]], 
async (req, res) => {
  const errors = validationResult(req);

  if(!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() })
  }

  const { addedBy, slugAddedBy, genre, link, subject, description, icon, content} = req.body;

  try{
    let topic = await ForumTopic.findOne({ subject: subject });
    // checking for dublicate subject
    if(topic){ 
      return res.status(400).json({ msg: 'Topic already exists'})
    }

    topic = new ForumTopic({
      addedBy: addedBy,
      slugAddedBy: slugAddedBy,
      genre: genre,
      link: link,
      subject: subject,
      description: description,
      icon: icon,
      content: content
    })
    const newtop = await topic.save();
    res.json(newtop);

  }catch(err){
    console.error(err.message);
    res.status(500).send('server error');
  }
})

// 2 
// @route GET api/forum
// @desc  get all forum topics
// @access Public
router.get('/', async (req, res) => {
  try{
    const topics = await ForumTopic.find().sort({date:-1}); 
    
    res.json(topics);

  } catch(err){
    console.error(err.message);
    res.status(500).send('server error');
  }
});


// 3
// @route GET api/forum/:forumLink
// @desc  get a certain forum topic by link
// @access Public

router.get('/:forumLink', async (req, res) => {
  const forumLink = req.params.forumLink;

  try{
    const findTopic = await ForumTopic.find({ link: forumLink });
    res.json(findTopic);

  }catch(err){
    console.error(err.message);
    res.status(500).send('server error');
  }
})

// 4 
// @route PUT api/forum/:id
// @desc  update a certain forum topic by id
// @access Private
router.put('/:id', auth, async (req, res) => {
  const { subject, description, icon, content } = req.body;
  let date = new Date();
  let edited = true;

  //submitted attrs by user
  const updateFields = {};
  if(subject) updateFields.subject = subject;
  if(description) updateFields.description = description;
  if(icon) updateFields.icon = icon;
  if(content) updateFields.content = content;
  updateFields.date = date
  updateFields.edited = edited

  try{
    let topic = await ForumTopic.findById(req.params.id);  // find topic by ID
    if(!topic) return res.status(404).json({ msg: 'Topic ID not found' });

    // process the update
    topic = await ForumTopic.findByIdAndUpdate(
      req.params.id,
      { $set: updateFields },
      { new: true }
    );
    res.json(topic); // send the updated game

  }catch(err){
    console.error(err.message);
    res.status(500).send('server error');
  }
})

module.exports = router;