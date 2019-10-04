const mongoose = require('mongoose');

// for authenticated users only
const ForumCommentSchema = mongoose.Schema({
  topic: {
    type: String
  },

  author: {
    type: String
  },

  slugAuthor: {
    type: String
  },

  content: {
    type: String,
    required: true
  },

  edited: {
    type: Boolean,
    default: false
  },

  date: {
    type: Date,
    default: Date.now
  }



});

module.exports = mongoose.model('forumComment', ForumCommentSchema);