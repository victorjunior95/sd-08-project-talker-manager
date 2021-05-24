module.exports = (err, _req, res, _next) => {
  if (err.isBoom) {
    const { statusCode, payload } = err.output;
    return res.status(statusCode).json({ message: payload.message });
  }

  res.status(500).send(err.message);
};
