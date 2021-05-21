const express = require('express');
const token = require('../services/createToken');
const isEmailValid = require('../services/emailValidation');
const isPasswordValid = require('../services/passwordValidation');

const OK = 200;
const BAD_REQUEST = 400;

const login = express.Router();

login.post('/', (request, response) => {
  const { email, password } = request.body;

  if (!email) {
    return response.status(BAD_REQUEST).json({ message: 'O campo "email" é obrigatório' });
  }
  if (!isEmailValid(email)) {
    return response.status(BAD_REQUEST)
      .json({ message: 'O "email" deve ter o formato "email@email.com"' });
  }
  if (!password) {
    return response.status(BAD_REQUEST).json({ message: 'O campo "password" é obrigatório' });
  }
  if (!isPasswordValid(password)) {
    return response.status(BAD_REQUEST)
      .json({ message: 'O "password" deve ter pelo menos 6 caracteres' });
  }
  return response.status(OK).json({ token: token() });
});

module.exports = login;
