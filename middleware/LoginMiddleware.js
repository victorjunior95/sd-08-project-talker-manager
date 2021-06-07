const crypto = require('crypto');

const regex = /^[a-z0-9.]+@[a-z0-9]+\.[a-z]+\.?([a-z]+)?$/i;

function loginMiddleware(req, res, next) {
  const token = crypto.randomBytes(8).toString('hex');
  const { email, password } = req.body;
  const validEmail = regex.test(email);
  if (!email) return res.status(400).json({ message: 'O campo "email" é obrigatório' });
  if (!validEmail) {
  return res.status(400).json({ message: 'O "email" deve ter o formato "email@email.com"' }); 
}
  if (!password) return res.status(400).json({ message: 'O campo "password" é obrigatório' });
  if (password.length < 6) {
  return res.status(400).json({ message: 'O "password" deve ter pelo menos 6 caracteres' }); 
}

  req.token = { token };
  next();
}

module.exports = {
  loginMiddleware,
};
