const crypto = require('crypto');

const verifyEmail = (email) => {
  const emailRegex = /^[a-z0-9.]+@[a-z0-9]+\.[a-z]+(\.[a-z]+)?$/i;
  return emailRegex.test(email);
};

function verifyPassword(password) {
  if (password !== undefined && password.length >= 6) {
    return true;
  }
  return false;
}

function getToken() {
  const token = crypto.randomBytes(8).toString('hex');
  return token;  
}

module.exports = (req, res) => {
  const { email, password } = req.body;
  const emailIsValid = verifyEmail(email);
  const passwordIsValid = verifyPassword(password); 
  if (!email) return res.status(400).send({ message: 'O campo "email" é obrigatório' });  
  if (!emailIsValid) {
    return res.status(400).send({ message: 'O "email" deve ter o formato "email@email.com"' });
  }
  if (!password) {
    return res.status(400).send({ message: 'O campo "password" é obrigatório' }); 
  }
  if (!passwordIsValid) {
    return res.status(400).send({ message: 'O "password" deve ter pelo menos 6 caracteres' });
  }
  return res.status(200).send({ token: getToken() });
};
