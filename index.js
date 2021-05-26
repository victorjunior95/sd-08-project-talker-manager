const express = require('express');

// const fs = require('fs');

const bodyParser = require('body-parser');

const app = express();
app.use(bodyParser.json());

const HTTP_OK_STATUS = 200;
const PORT = '3000';

// não remova esse endpoint, e para o avaliador funcionar
app.get('/', (_request, response) => {
  response.status(HTTP_OK_STATUS).send();
});
// importando funcionalidades
const authemail = require('./authemail');
const authpaswd = require('./authpaswd');
const req1 = require('./req1');
const req2 = require('./req2');

// req-1
app.get('/talker', req1);

// req-2
app.get('/talker/:id', req2);

// req-3
app.post('/login', authpaswd, authemail, (req, res) => (
  res.status(200).send({ token: (Math.random()).toString(2).substring(2, 18) })));

// req-4
app.post('talker',);

app.listen(PORT, () => {
  console.log('Online');
});
