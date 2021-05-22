const tokenGenerator = require('./generateToken');

const verifyLogin = (req, res) => {
  const { email, password } = req.body;
  const emailRegex = /^[\w-.]+@([\w-]+\.)+[\w-]{2,4}$/g; // Regex retirado do site https://regexr.com/3e48o
  if (!email) {
    return res.status(400).json({ message: 'O campo "email" é obrigatório' });
  }
  if (!emailRegex.test(email)) {
    return res.status(400).json({ message: 'O "email" deve ter o formato "email@email.com"' });
  }
  if (!password) {
    return res.status(400).json({ message: 'O campo "password" é obrigatório' });
  }
  if (password.length < 6) {
    return res.status(400).json({ message: 'O "password" deve ter pelo menos 6 caracteres' });
  }
  res.status(200).json({ token: tokenGenerator() });
};

module.exports = verifyLogin;
