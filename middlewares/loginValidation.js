const generateToken = require('../services/generateToken');

// I built my ownn RegEx at regex101.com
const emailRegEx = /[a-z]\w+@\w+.\w+/;
module.exports = (req, res) => {
  const { email, password } = req.body;
  if (!email) return res.status(400).json({ message: 'O campo "email" é obrigatório' });
  if (!email.match(emailRegEx)) {
    return res.status(400).json({
      message: 'O "email" deve ter o formato "email@email.com"',
    });
  }
  if (!password) {
    return res.status(400).json({
      message: 'O campo "password" é obrigatório',
    });
  }
  if (password.length < 6) {
    return res.status(400).json({ message: 'O "password" deve ter pelo menos 6 caracteres' });
  }
  res.status(200).json({ token: generateToken() });
  };
