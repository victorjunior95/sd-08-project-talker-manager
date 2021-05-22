const crypto = require('crypto');

const message = {
  emptyEmail: 'O campo "email" é obrigatório',
  invalidEmail: 'O "email" deve ter o formato "email@email.com"',
  emptyPassword: 'O campo "password" é obrigatório',
  invalidPassword: 'O "password" deve ter pelo menos 6 caracteres',
};

module.exports = (req, res) => {
  const { email, password } = req.body;
  const validEmail = /\S+@\S+\.\S+/.test(email);
  const token = crypto.randomBytes(8).toString('hex');
  if (!email) {
    res.status(400).json({ message: message.emptyEmail });
  }
  if (!validEmail) {
    res.status(400).json({ message: message.invalidEmail });
  }
  if (!password) {
    res.status(400).json({ message: message.emptyPassword });
  }
  if (password.length < 6) {
    res.status(400).json({ message: message.invalidPassword });
  }
  res.json({
    token,
  });
};
