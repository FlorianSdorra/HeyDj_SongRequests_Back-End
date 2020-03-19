const express = require('express');
const router = express.Router();
const auth = require('../middleware/authenticator');

const {
  getEvents,
  getEvent,
  addEvent,
  deleteEvent,
  updateEvent,
  getMyEvents
} = require('../controllers/eventsController');

router
  .route('/')
  .get(getEvents)
  .post(auth, addEvent);

router.route('/my').get(auth, getMyEvents);

router
  .route('/:id')
  .get(getEvent)
  .delete(auth, deleteEvent)
  .put(auth, updateEvent);

// router.route('/:id/tracks').get(getEventsTracks);

module.exports = router;
