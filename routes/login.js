const express = require('express');

const middlewares = require('../middlewares');

const routeLogin = express.Router();

const HTTP_OK_STATUS = 200;
const HTTP_BAD_REQUEST_STATUS = 400;
const MIN_PASSWORD = 6;
const HTTP_ISE_STATUS = 500;

routeLogin.post('/', middlewares.emailValidation, (req, res) => {
  const { password } = req.body;
  try {
    if (!password) {
      return res.status(HTTP_BAD_REQUEST_STATUS)
        .json({ message: 'O campo "password" é obrigatório' });
    }
    if (String(password).length < MIN_PASSWORD) {
      return res.status(HTTP_BAD_REQUEST_STATUS)
        .json({ message: 'O "password" deve ter pelo menos 6 caracteres' });
    }
    return res.status(HTTP_OK_STATUS).json({ token: middlewares.generateToken(16) });
  } catch (err) {
    return res.status(HTTP_ISE_STATUS).send({ err });
  }
});

module.exports = routeLogin;