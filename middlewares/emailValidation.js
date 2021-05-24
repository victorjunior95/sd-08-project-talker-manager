const emailValidation = (req, res, next) => {
  const { email } = req.body;
  const emailRegex = /^[a-z0-9.]+@[a-z]+(\.[a-z]+)+$/

  if (!email) {
    return res.status(400).json({ 'message': 'O campo "email" é obrigatório' });
  }

  if (email.match(emailRegex)) {
    return next();
  }

  return res.status(400).json({ 'message': 'O "email" deve ter o formato "email@email.com"' });
};

module.exports = emailValidation;
