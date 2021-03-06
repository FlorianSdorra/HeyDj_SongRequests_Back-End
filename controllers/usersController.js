const User = require('../models/User');
const createError = require('http-errors');

exports.getUsers = async (req, res, next) => {
  try {
    const users = await User.find()
      .sort('lastName')
      .select('-password -__v -tokens._id');
    res.status(200).send(users);
  } catch (e) {
    next(e);
  }
};

exports.getUser = async (req, res, next) => {
  try {
    const user = await User.findById(req.params.id).select('-password -__v');
    if (!user) throw new createError.NotFound();
    res.status(200).send(user);
  } catch (e) {
    next(e);
  }
};

exports.deleteUser = async (req, res, next) => {
  try {
    // What happens when an Admin want to delete a User's account??
    const user = await User.findByIdAndDelete(req.params.id);
    if (!user) throw new createError.NotFound();
    res
      .status(200)
      .send(user)
      .select('-password');
  } catch (e) {
    next(e);
  }
};

exports.updateUser = async (req, res, next) => {
  try {
    const user = await User.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true
    });
    if (!user) throw new createError.NotFound();
    const data = user.getPublicFields();
    res.status(200).send(data);
  } catch (e) {
    next(e);
  }
};

exports.addUser = async (req, res, next) => {
  try {
    const user = new User(req.body);
    const token = user.generateAuthToken();
    await user.save();
    const data = user.getPublicFields();
    res
      .status(200)
      .cookie('token', token, {
        expires: new Date(Date.now() + 604800000),
        secure: false, // if we are not using https
        httpOnly: true
      })
      .send(data);
  } catch (e) {
    next(e);
  }
};

exports.loginUser = async (req, res, next) => {
  const email = req.body.email;
  const password = req.body.password;

  try {
    const user = await User.findOne({ email });
    const token = user.generateAuthToken();
    const canLogin = await user.checkPassword(password);
    if (!canLogin) throw new createError.NotFound();
    const data = user.getPublicFields();
    res
      .status(200)
      .cookie('token', token, {
        expires: new Date(Date.now() + 4 * 604800000),
        secure: false, // if we are not using https
        httpOnly: true
      })
      .send(data);
  } catch (e) {
    next(e);
  }
};

exports.authenticateUser = async (req, res, next) => {
  const user = req.user.getPublicFields();
  res.status(200).send(user);
};

exports.logoutUser = async (req, res, next) => {
  res
    .clearCookie('token')
    .status(200)
    .send('Bye bye');
};
