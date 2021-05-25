const crypto = require('crypto');
const express = require('express');

const route = express.Router();

route.post('/', (req, res) => {
  const { email, password } = req.body;
  const regexEmail = /.+@[A-z]+[.]com/;
  const emailIsValid = regexEmail.test(email);
  if (!email) return res.status(400).send({ message: 'O campo "email" é obrigatório' });
  if (!emailIsValid) {
    return res.status(400).send({ message: 'O "email" deve ter o formato "email@email.com"' });
  }
  if (!password) { 
    return res.status(400).send({ message: 'O campo "password" é obrigatório' });
  }
  if (password.length < 6) {
    return res.status(400).send({ message: 'O "password" deve ter pelo menos 6 caracteres' });
  }
  return res.status(200).json({ token: crypto.randomBytes(8).toString('hex') });
});

module.exports = route;