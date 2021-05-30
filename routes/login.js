const express = require('express');
const bodyParser = require('body-parser');
const crypto = require('crypto');

const app = express();
app.use(bodyParser.json());

function verifyEmail(email) {
  const emailRegex = /^[a-z0-9.]+@[a-z0-9.]+\.[a-z]+$/i;
  return emailRegex.test(email);
}

/* Referência (-- Exercício 1 --):
https://app.betrybe.com/course/back-end/nodejs/express-http-with-nodejs-practing/solutions
*/
app.post('/', (req, res) => { // localhost:3000/login/
  const { body } = req;
  const emailIsValid = verifyEmail(body.email);

  if (!body.email) {
    res.status(400).json({ message: 'O campo "email" é obrigatório' });
  } if (!emailIsValid) {
    res.status(400).json({ message: 'O "email" deve ter o formato "email@email.com"' });
  }
  if (!body.password) {
    res.status(400).json({ message: 'O campo "password" é obrigatório' });
  } if (body.password.length < 6) {
    res.status(400).json({ message: 'O "password" deve ter pelo menos 6 caracteres' });
  }
  const token = crypto.randomBytes(8).toString('hex');
  res.status(200).json({ token });
});

module.exports = app;