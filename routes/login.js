const express = require('express');

const validationEmailMiddleware = require('../middlewares/validationEmailMiddleware');
const validationPasswordMiddleware = require('../middlewares/validationPasswordMiddleware');

const app = express();

app.post('/',
  validationEmailMiddleware,
  validationPasswordMiddleware,
  (_req, res) => {
    const rand = () => Math.random(0).toString(36).substr(2);
    const createToken = (length) => (rand() + rand() + rand() + rand()).substr(0, length);
    const token = createToken(16);
    res.status(200).json({ token });
  });

module.exports = app;