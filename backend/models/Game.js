const mongoose = require('mongoose');

const GameSchema = mongoose.Schema({
  user: {
    type: mongoose.Schema.Schema.Types.ObjectId,
    ref: 'users'
  },

  game: {
    type: String
  },
  score: {
    type: String
  },
  date: {
    type: Date,
    default: Date.now
  }

});

module.exports = mongoose.model('user', GameSchema);