const express = require('express');
const router = express.Router();
const { check, validationResult } = require('express-validator');
const auth = require('../middleware/auth');

const ForumTopic = require("../models/ForumTopic");

// 1 
// @route POST api/forum
// @desc  post a forum topic
// @access Private
router.post('/', auth, [
  check('subject', 'Please add a subject').not().isEmpty(),
  check('description', 'Please add a description').not().isEmpty(),
  check('content', 'Please add a content').not().isEmpty()
], 
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
    await topic.save();

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
// @route GET api/forum/:id
// @desc  get a certain forum topic
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

module.exports = router;