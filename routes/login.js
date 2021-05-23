const express = require('express');

const middlewares = require('../middlewares');

const routeLogin = express.Router();

const HTTP_OK_STATUS = 200;
const HTTP_BAD_REQUEST_STATUS = 400;
const MIN_PASSWORD = 6;

routeLogin.post('/', (req, res) => {
  const { email, password } = req.body;
  const emailValidation = /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/;
  if (!email) {
    res.status(HTTP_BAD_REQUEST_STATUS).json({ message: 'O campo "email" é obrigatório' });
  }
  if (!emailValidation.test(email)) {
    res.status(HTTP_BAD_REQUEST_STATUS)
      .json({ message: 'O "email" deve ter o formato "email@email.com"' });
  }
  if (!password) {
    res.status(HTTP_BAD_REQUEST_STATUS).json({ message: 'O campo "password" é obrigatório' });
  }
  if (String(password).length < MIN_PASSWORD) {
    res.status(HTTP_BAD_REQUEST_STATUS)
      .json({ message: 'O "password" deve ter pelo menos 6 caracteres' });
  }
  return res.status(HTTP_OK_STATUS).json({ token: middlewares.generateToken(16) });
});

module.exports = routeLogin;