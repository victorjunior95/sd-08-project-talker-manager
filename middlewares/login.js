const crypto = require('crypto');

module.exports = (req, res) => {
  const token = crypto.randomBytes(8).toString('hex');
  const regex = /\S+@\S+\.\S+/;
  const { email } = req.body;
  const { password } = req.body;

  if (!email) {
    return res.status(400).json({ message: 'O campo "email" é obrigatório' });
  } if (!regex.test(email)) {
    return res.status(400).json({ message: 'O "email" deve ter o formato "email@email.com"' });
  } if (!password) {
    return res.status(400).json({ message: 'O campo "password" é obrigatório' });
  } if (password.length < 6) {
    return res.status(400).json({ message: 'O "password" deve ter pelo menos 6 caracteres' });
  }
  return res.status(200).json({ token });
};