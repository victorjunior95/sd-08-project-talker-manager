const crypto = require('crypto');

const MIN_LENGTH = 6;

const validationUser = (req, res) => {
  const { email, password } = req.body;
  const validEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  const token = crypto.randomBytes(8).toString('hex');
  if (!email) {
    res.status(400).json({ message: 'O campo "email" é obrigatório' });
  }
  if (!validEmail) {
    res.status(400).json({ message: 'O "email" deve ter o formato "email@email.com"' });
  }
  if (!password) {
    res.status(400).json({ message: 'O campo "password" é obrigatório' });
  }
  if (password.length < MIN_LENGTH) {
    res.status(400).json({ message: 'O "password" deve ter pelo menos 6 caracteres' });
  }
  res.json({ token });
};

module.exports = validationUser;
