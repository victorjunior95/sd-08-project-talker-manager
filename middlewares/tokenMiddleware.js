const express = require('express');
const bodyParser = require('body-parser');

const app = express();
app.use(bodyParser.json());

const tokenMiddleware = (req, res, next) => {
  if (!req.headers.authorization || req.headers.authorization === '') {
    return res.status(401).json({ message: 'Token não encontrado' });
  }
  if (req.headers.authorization.length !== 16) {
    return res.status(401).json({ message: 'Token inválido' });
  }
  next();
};

module.exports = tokenMiddleware;
