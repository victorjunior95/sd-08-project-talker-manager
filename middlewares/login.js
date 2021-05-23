const generateToken = require('./generateToken');

const login = (req, res, _next) => {
  if (!req.body.email) {
    return res.status(400).json({ message: 'O campo "email" é obrigatório' });
  }
  const rx = /^[\w-.]+@([\w-]+\.)+[\w-]{2,4}$/g;
  if (!rx.test(req.body.email)) {
    return res.status(400).json({ message: 'O "email" deve ter o formato "email@email.com"' });
  }
  if (!req.body.password) {
    return res.status(400).json({ message: 'O campo "password" é obrigatório' });
  }
  if (req.body.password.toString().length < 6) {
    return res.status(400).json({ message: 'O "password" deve ter pelo menos 6 caracteres' });
  }
  res.status(200).json({ token: generateToken(16) });
};

module.exports = login; 