const express = require('express');
const router = express.Router();
const auth = require('../middleware/authenticator');

const {getTracks, getTrack, addTrack, deleteTrack, updateTrack } = require('../controllers/tracksController');

router
  .route('/')
  .post(addTrack)
  .get(getTracks);

router
  .route('/:id')
  .get(getTrack)
  .delete(deleteTrack)
  .put(updateTrack);

module.exports = router;
