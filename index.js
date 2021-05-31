const express = require('express');
const bodyParser = require('body-parser');

const talker = require('./middlewares/talker');
const talkerById = require('./middlewares/talkerById');
const login = require('./middlewares/login');

const checkToken = require('./middlewares/checkToken');
const checkName = require('./middlewares/checkName');
const checkAge = require('./middlewares/checkAge');
const checkTalk = require('./middlewares/checkTalk');
const checkTalkWatched = require('./middlewares/checkTalkWatched');
const checkTalkRate = require('./middlewares/checkTalkRate');
const newTalker = require('./middlewares/newTalker');

const app = express();
app.use(bodyParser.json());

const HTTP_OK_STATUS = 200;
const PORT = '3000';

// não remova esse endpoint, e para o avaliador funcionar
app.get('/', (_request, response) => {
  response.status(HTTP_OK_STATUS).send();
});

app.listen(PORT, () => {
  console.log('Online');
});

app.get('/talker', talker);
app.get('/talker/:id', talkerById);
app.post('/login', login);
app.post('/talker',
  checkToken,
  checkName,
  checkAge,
  checkTalk,
  checkTalkWatched,
  checkTalkRate,
  newTalker);
