exports.logError = (err, _req, res, _next) => {
  console.error(`=>  ${err}`);
  return res.status(500)
  .json({ message: `error in the server ${err.message}` });
};