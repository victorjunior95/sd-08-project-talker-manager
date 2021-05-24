const login = (req, res, _next) => {
  const { token } = req.headers;
  res.status(200).json({ token: token });
};

module.exports = login;
