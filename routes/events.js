// const express = require("express");
// const router = express.Router();

// const {
//   getEvents,
//   getEvent,
//   addEvent,
//   deleteEvent,
//   updateEvent
// } = require("../controllers/eventsController");

// router
//   .route("/")
//   .get(getEvents)
//   .post(addEvent);

// router
//   .post("/:id")
//   .get(getEvent)
//   .delete(deleteEvent)
//   .put(updateEvent);

// module.exports = router;

const express = require("express");
const router = express.Router();
const {
  getEvents,
  getEvent,
  addEvent,
  deleteEvent,
  updateEvent
} = require("../controllers/eventsController");
router
  .route("/")
  .get(getEvents)
  .post(addEvent);
router
  .route("/:id")
  .get(getEvent)
  .delete(deleteEvent)
  .put(updateEvent);
module.exports = router;
