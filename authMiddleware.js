function authEmail(req, res, next) {
  const { email } = req.body;
  if (!email) {
    return res.status(400).json({
      message: 'O campo "email" é obrigatório',
    });
  }
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(email)) {
    return res.status(400).json({
      message: 'O "email" deve ter o formato "email@email.com"',
    });
  }
  next();
}

function authPassword (req, res, next) {
  const { password } = req.body;
  if (!password) {
    return res.status(400).json({
      message: 'O campo "password" é obrigatório',
    });
  }
  if (password < 6) {
    return res.status(400).json({
      message: 'O "password" deve ter pelo menos 6 caracteres',
    });
  }
  next();
}

module.exports = {
  authEmail,
  authPassword,
};
