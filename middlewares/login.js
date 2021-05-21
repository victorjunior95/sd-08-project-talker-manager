const crypto = require('crypto');

function verifyEmail(email) {
  const emailRegex = /\S+@\S+\.\S+/;
  return emailRegex.test(email);
}

module.exports = (req, res) => {
  const { body } = req;
  const token = crypto.randomBytes(8).toString('hex');
  const isValidEmail = verifyEmail(body.email);

  if (body.email === undefined) {
    return res.status(400).json({ message: 'O campo "email" é obrigatório' });
  }
  if (body.password === undefined) {
    return res.status(400).json({ message: 'O campo "password" é obrigatório' });
  }
  if (!isValidEmail) {
    return res.status(400).json({ message: 'O "email" deve ter o formato "email@email.com"' });
  }
  if (body.password.length < 6) {
    return res.status(400).json({ message: 'O "password" deve ter pelo menos 6 caracteres' });
  }
  return res.status(200).json({ token });
};
