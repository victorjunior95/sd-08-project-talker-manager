const express = require('express');
const bodyParser = require('body-parser');
const challengeOne = require('./challenge1');
const getById = require('./getById');
const getToken = require('./getToken');
const {
  validateToken,
  validateName,
  validateAge,
  validateDate,
  validateEmpty,
  postTalker,
} = require('./middlewares');

const app = express();
app.use(bodyParser.json());

const HTTP_OK_STATUS = 200;
const PORT = '3000';

// não remova esse endpoint, e para o avaliador funcionar
app.get('/', (_request, response) => {
  response.status(HTTP_OK_STATUS).send();
});

app.get('/talker', challengeOne);
app.get('/talker/:id', getById);
app.post('/login', getToken);
app.post('/talker',
  validateToken,
  validateName,
  validateAge,
  validateDate,
  validateEmpty,
  postTalker);

app.post('/name', validateToken, (_req, res) => {
  res.status(201).send('ok');
});

app.listen(PORT, () => {
  console.log('Online');
});
