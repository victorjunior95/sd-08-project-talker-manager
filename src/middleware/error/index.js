module.exports = (error, _req, res, _next) => {
  if (error.isBoom) {
    const { statusCode, payload: { message } } = error.output;
    return res.status(statusCode).json({ message });
  }
  if (error.isJoi) return res.status(400).json({ message: error.details[0].message });

  res.status(500).json({ message: error.message });
};
