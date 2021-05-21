const express = require('express');
const bodyParser = require('body-parser');
const rescue = require('express-rescue');
const middleware = require('./middlewares');

const app = express();
app.use(bodyParser.json());

const HTTP_OK_STATUS = 200;

const PORT = '3000';

app.get(
  '/talker/search',
  middleware.verifyToken,
  rescue(middleware.searchTalkers),
);

app.get('/talker/:id', rescue(middleware.talkerById));

app.get('/talker', rescue(middleware.talkers));

app.post('/login', middleware.auth);

app.post(
  '/talker',
  middleware.verifyToken,
  middleware.verifyBodyName,
  middleware.verifyBodyAge,
  middleware.verifyBodyTalk,
  middleware.verifyBodyTalkKeys,
  rescue(middleware.addTalker),
);

app.put(
  '/talker/:id',
  middleware.verifyToken,
  middleware.verifyBodyName,
  middleware.verifyBodyAge,
  middleware.verifyBodyTalk,
  middleware.verifyBodyTalkKeys,
  rescue(middleware.editTalkerById),
);

app.delete(
  '/talker/:id',
  middleware.verifyToken,
  rescue(middleware.deleteTalkerById),
);

// não remova esse endpoint, e para o avaliador funcionar
app.get('/', (_request, response) => {
  response.status(HTTP_OK_STATUS).send();
});

app.listen(PORT, () => {
  console.log('Online');
});
