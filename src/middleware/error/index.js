module.exports = (error, _req, res, _next) => {
  if (error.isBoom) {
    const { statusCode, payload } = error.output;
    return res.status(statusCode).json({ message: payload.message });
  }
  res.status(500).json({ message: error.message });
};
