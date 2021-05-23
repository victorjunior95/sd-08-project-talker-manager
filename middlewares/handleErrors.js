module.exports = (err, _req, res, _next) => {
  if (err.isBoom) {
    const { statusCode, payload } = err.output;
    return res.status(statusCode).send({ message: payload.message });
  }

  if (err.isJoi) return res.status(400).json({ message: err.details[0].message });

  res.status(500).json({ message: err.message });
};
