module.exports = (err, _req, res, _next) => {
  if (err.isBoom) {
    const { statusCode, payload } = err.output;
    return res.status(statusCode).json({ message: payload.message });
  }

  if (err.isJoi) {
    const errorMessages = err.details.map(({ message }) => message).join(';      ');
    return res.status(400).json({ message: errorMessages });
  }

  res.status(500).send(err.message);
};
