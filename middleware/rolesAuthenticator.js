const createError = require('http-errors');

const isAdmin = (req, res, next) => {
  const role = req.user.role;
  if (role !== 'Admin') throw new createError.NotFound();
  next();
};

module.exports = isAdmin;
