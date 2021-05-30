const express = require('express');
const bodyParser = require('body-parser');
const crypto = require('crypto');

const app = express();
app.use(bodyParser.json());

function verifyEmail(email) {
  const emailRegex = /^[a-z0-9.]+@[a-z0-9.]+\.[a-z]+$/i;
  return emailRegex.test(email);
}

// function verifyToken(token) {
//   const tokenRegex = /^(\d|\w){16}$/gm;
//   return tokenRegex.test(token);
// }

// CREATE
// localhost:3000/login/
app.post('/', (req, res) => {
  const { body } = req;
  const emailIsValid = verifyEmail(body.email);

  if (!body.email) {
    return res.status(400).json({ message: 'O campo "email" é obrigatório' });
  } if (!emailIsValid) {
    return res.status(400).json({ message: 'O "email" deve ter o formato "email@email.com"' });
  }
  if (!body.password) {
    return res.status(400).json({ message: 'O campo "password" é obrigatório' });
  } if (body.password.length < 6) {
    return res.status(400).json({ message: 'O "password" deve ter pelo menos 6 caracteres' });
  }
  const token = crypto.randomBytes(8).toString('hex');
  return res.status(200).json({ token });
});

module.exports = app;