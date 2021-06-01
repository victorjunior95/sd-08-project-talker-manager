const express = require('express');
const bodyParser = require('body-parser');
const middlewares = require('./middlewares');

const app = express();
app.use(bodyParser.json());

const HTTP_OK_STATUS = 200;
const PORT = '3000';

// não remova esse endpoint, e para o avaliador funcionar
app.get('/', (_request, response) => {
  response.status(HTTP_OK_STATUS).send();
});

app.get('/talker', middlewares.getTalkers);
app.get('/talker/:id', middlewares.getTalkerById);

app.post(
  '/login',
  middlewares.tokenGenerator,
  middlewares.emailValidation,
  middlewares.passwordValidation,
  middlewares.login,
);
app.post(
  '/talker',
  middlewares.tokenValidation,
  middlewares.nameValidation,
  middlewares.ageValidation,
  middlewares.talkValidation,
  middlewares.talkWatchedAtValidation,
  middlewares.talkRateValidation,
  middlewares.postTalker,
);

app.listen(PORT, () => {
  console.log('Online');
});
