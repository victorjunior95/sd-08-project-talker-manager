module.exports = (err, _req, res, next) => {
  res.status(err.status).json(err.message);
  next();
};