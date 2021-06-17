const express = require('express');

const { validateLogin } = require('../Validation');

const login = express.Router();

login.post(
  '/login',
  validateLogin,
);

module.exports = login;
