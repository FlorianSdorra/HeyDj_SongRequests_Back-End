const Event = require('../models/Event');
const Track = require('../models/Track');

exports.getEvents = async (req, res, next) => {
  try {
    const events = await Event.find();
    res.status(200).send(events);
  } catch (e) {
    next(e);
  }
};

exports.getMyEvents = async (req, res, next) => {
  try {
    const events = await Event.find({ userId: req.user._id });
    res.status(200).send(events);
  } catch (e) {
    next(e);
  }
};

exports.getEvent = async (req, res, next) => {
  try {
    const event = await Event.findById(req.params.id).select('-__v');
    if (!event) throw new createError.NotFound();
    res.status(200).send(event);
  } catch (e) {
    next(e);
  }
};

exports.getEventsTracks = async (req, res, next) => {
  try {
    const tracks = await Track.find({ eventId: req.params.id })
      .select('-__v')
      .sort([['votes', 'descending']]);
    if (!tracks) throw new createError.NotFound();
    res.status(200).send(tracks);
  } catch (e) {
    next(e);
  }
};

exports.deleteEvent = async (req, res, next) => {
  try {
    const event = await Event.findByIdAndDelete(req.params.id);
    if (!event) throw new createError.NotFound();
    res.status(200).send(event);
  } catch (e) {
    next(e);
  }
};

exports.updateEvent = async (req, res, next) => {
  try {
    const event = await Event.findByIdAndUpdate(req.params.id, req.body, {
      new: true
    }).select('-__v');
    if (!event) throw new createError.NotFound();
    res.status(200).send(event);
  } catch (e) {
    next(e);
  }
};

exports.addEvent = async (req, res, next) => {
  try {
    const event = new Event({ ...req.body, userId: req.user._id });
    await event.save();
    res.status(200).send(event);
  } catch (e) {
    next(e);
  }
};
