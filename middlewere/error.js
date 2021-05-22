exports.logError = (err, _req, res, next) => {
  console.error(`=>  ${err}`);
  res.status(500)
  .json({ message: `error in the server ${err.message}` });
  next(err);
};