module.exports = (err, _req, res, _next) => {
  if (err.status) {
    return res.status(err.status).json({ error: err.message });
  }

  res.status(500).json({ error: err.message });
};
