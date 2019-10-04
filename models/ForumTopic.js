const mongoose = require('mongoose');

// for authenticated users only
const ForumTopicSchema = mongoose.Schema({
  addedBy: {
    type: String
  },

  slugAddedBy: {
    type: String
  },

  // eg. 'games'
  genre: { 
    type: String 
  },

  // eg. 'about-website'
  link: { 
    type: String
  },

  // eg. 'Snake discussion'
  subject: {  
    type: String,
    required: true,
    unique: true
  },

  // desc under subject
  description: { 
    type: String, 
    required: true 
  },

  // eg. 'fa fa-trophy'
  icon: {
    type: String
  },

  content: {
    type: String,
    required: true
  },
  
  date: {
    type: Date,
    default: Date.now
  }


});

module.exports = mongoose.model('forumTopic', ForumTopicSchema);