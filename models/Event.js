const mongoose = require('mongoose');
const { Schema } = mongoose;

const EventSchema = new Schema({
  userId: {
    type: String,
    required: true
  },
  title: {
    type: String,
    required: true
  },
  artist: {
    type: String,
    required: true
  },
  date: {
    type: String,
    required: true
  },
  location: {
    type: String,
    required: true
  },
  time: {
    type: Date,
    required: true
  },
  genre: {
    type: String
  }
  // tracklist: [
  //   {
  //     nameOfArtist: String,
  //     nameOfSong: String,
  //     name: String,
  //     duration: Number
  //   }
  // ]
});

module.exports = mongoose.model('Event', EventSchema);
