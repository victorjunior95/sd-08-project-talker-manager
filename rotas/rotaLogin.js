const express = require('express');
const { genrateToken, validaEmail } = require('./servicosReq3');

const login = express.Router();
const HTTP_OK_STATUS = 200;
const VAZIO = 400;

login.post('/', (req, res) => {
  const { email, password } = req.body;

  if (!email) return res.status(VAZIO).send({ message: 'O campo "email" é obrigatório' });
  if (!validaEmail(email)) {
    return res.status(VAZIO).send({ message: 'O "email" deve ter o formato "email@email.com"' });
  }
  if (!password) return res.status(VAZIO).send({ message: 'O campo "password" é obrigatório' });
  if (String(password).length < 6) {
    return res.status(VAZIO).send({ message: 'O "password" deve ter pelo menos 6 caracteres' });
  }

  res.status(HTTP_OK_STATUS).send({ token: genrateToken() });
});

module.exports = login;
