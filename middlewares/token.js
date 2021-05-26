const express = require('express');
const randomstring = require('randomstring');

const app = express();

app.post('/', (_request, response) => {
  response.send({ token: randomstring.generate(16) });
});

module.exports = app;
