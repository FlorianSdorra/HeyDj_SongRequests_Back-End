const mongoose = require('mongoose');
const { Schema } = mongoose;

const TracksSchema = new Schema({
  eventId: {
    type: String,
    required: true
  },
  artist: {
    type: String,
    required: true
  },
  album: {
    type: String,
    required: true
  },
  title: {
    type: String,
    required: true
  },
  artwork: {
    type: String,
    required: true
  },
  deezerId: {
    type: String,
    required: true
  },
  duration: {
    type: String,
    required: true
  },
  votes: {
    type: Number,
    default: 0
  }
});

module.exports = mongoose.model('Tracks', TracksSchema);
