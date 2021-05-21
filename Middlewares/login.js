const crypto = require('crypto');

const token = crypto.randomBytes(8).toString('hex');

const emptyEmail = {
  message: 'O campo "email" é obrigatório',
};
const emptyPassword = {
  message: 'O campo "password" é obrigatório',
};
const invalidEmail = {
  message: 'O "email" deve ter o formato "email@email.com"',
};
const invalidPassword = {
  message: 'O "password" deve ter pelo menos 6 caracteres',
};

module.exports = (req, res) => {
  const { email, password } = req.body;
  const emailValidate = /^[a-z0-9.]+@[a-z0-9]+\.[a-z]+$/i;

  if (!email) res.status(400).json(emptyEmail);
  if (!password) res.status(400).json(emptyPassword);
  if (!emailValidate.test(email)) res.status(400).json(invalidEmail);
  if (password.length < 6) res.status(400).json(invalidPassword);

  res.status(200).json({ token });
};
