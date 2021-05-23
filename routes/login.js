const express = require('express');
const crypto = require('crypto');
const loginSchema = require('../schema/login');

const login = express.Router();

login.post('/', (req, res, next) => {
  const { error } = loginSchema.validate(req.body);

  if (error) return next(error);

  res.status(200).send({ token: crypto.randomBytes(8).toString('hex') });
});

module.exports = login;
