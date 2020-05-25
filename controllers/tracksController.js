const Track = require('../models/Track');

exports.getTracks = async (req, res, next) => {
  try {
    const tracks = await Track.find();
    res.status(200).send(tracks);
  } catch (e) {
    next(e);
  }
};

exports.getTrack = async (req, res, next) => {
  try {
    const track = await Track.findById(req.params.id).select('-__v');
    if (!track) throw new createError.NotFound();
    res.status(200).send(track);
  } catch (e) {
    next(e);
  }
};

exports.deleteTrack = async (req, res, next) => {
  try {
    const track = await Track.findByIdAndDelete(req.params.id);
    if (!track) throw new createError.NotFound();
    res.status(200).send(track);
  } catch (e) {
    next(e);
  }
};

exports.updateTrack = async (req, res, next) => {
  try {
    const track = await Track.findByIdAndUpdate(req.params.id, req.body, {
      new: true
    }).select('-__v');
    if (!track) throw new createError.NotFound();
    res.status(200).send(track);
  } catch (e) {
    next(e);
  }
};

exports.addTrack = async (req, res, next) => {
  try {
    const track = new Track(req.body);
    await track.save();
    res.status(200).send(track);
  } catch (e) {
    next(e);
  }
};
