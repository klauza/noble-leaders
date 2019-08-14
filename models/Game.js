const mongoose = require('mongoose');

const GameSchema = mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'users'
  },

  name: {
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

module.exports = mongoose.model('game', GameSchema);