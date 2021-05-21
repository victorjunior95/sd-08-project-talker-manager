const crypto = require('crypto');

const emailVerification = (email) => {
  const regexEmail = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/i;
  const validation = regexEmail.test(email);
  return validation;
};

const generateToken = (password) => {
  const random = Math.random().toString();
  const token = crypto.createHash('sha1').update(password + random).digest('hex');
  const smallToken = token.slice(0, 16);
  return smallToken;
};

module.exports = (req, res, _next) => {
  const { email, password } = req.body;

  if (!email) return res.status(400).json({ message: 'O campo "email" é obrigatório' });
  if (!emailVerification(email)) {
    return res.status(400).json({ message: 'O "email" deve ter o formato "email@email.com"' });
  }
  if (!password) return res.status(400).json({ message: 'O campo "password" é obrigatório' });
  if (password.length < 6) {
    return res.status(400).json({ message: 'O "password" deve ter pelo menos 6 caracteres' });
  }

  const token = generateToken(password);
  res.status(200).json({ token });
};
