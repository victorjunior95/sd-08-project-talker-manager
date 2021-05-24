const crypto = require('crypto');

const verifyEmail = (email) => {
  const re = /.+@[A-z]+[.]com/;
  const isValidEmail = re.test(email);
  if (email === undefined || email.length === 0) return 'O campo "email" é obrigatório';
  if (!isValidEmail) return 'O "email" deve ter o formato "email@email.com"';
  return '';
};

const verifyPassword = (password) => {
  if (password === undefined || password.toString().length === 0) {
    return 'O campo "password" é obrigatório';
  }
  if (password.toString().length < 6) return 'O "password" deve ter pelo menos 6 caracteres';
  return '';
};

module.exports = (req, res) => {
  const { email } = req.body;
  const { password } = req.body;
  const emailValid = verifyEmail(email);
  const passwordValid = verifyPassword(password);
  if (emailValid.length !== 0) return res.status(400).json({ message: emailValid });
  if (passwordValid.length !== 0) return res.status(400).json({ message: passwordValid });
  res.status(200).send({ token: crypto.randomBytes(8).toString('hex') });
};
