const express = require('express');
const bodyParser = require('body-parser');
const Crypto = require('crypto');
const loginMiddleware = require('../middlewares/loginMiddleware');

const app = express();
app.use(bodyParser.json());

function randomString(size = 16) {  
  return Crypto
    .randomBytes(size)
    .toString('base64')
    .slice(0, size);
}

app.post('/', loginMiddleware, (_req, res) => {
    const token = randomString();
    res.status(200).send({ token });
  });

module.exports = app;