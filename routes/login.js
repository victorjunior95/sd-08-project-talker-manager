const express = require('express');
const { generateToken, isPasswordValid, isEmailValid } = require('../services');

const login = express.Router();

login.post('/', (req, res) => {
  const { email, password } = req.body;

  if (!email) return res.status(400).send({ message: 'O campo "email" é obrigatório' });
  if (!isEmailValid(email)) {
    return res.status(400).send({ message: 'O "email" deve ter o formato "email@email.com"' });
  }
  if (!password) return res.status(400).send({ message: 'O campo "password" é obrigatório' });
  if (!isPasswordValid(password)) {
    return res.status(400).send({ message: 'O "password" deve ter pelo menos 6 caracteres' });
  }

  res.status(200).send({ token: generateToken() });
});

module.exports = login;
