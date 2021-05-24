const express = require('express');
const bodyParser = require('body-parser');
const fs = require('fs');
const middlewares = require('./middlewares');

const app = express();
app.use(bodyParser.json());

const HTTP_OK_STATUS = 200;
const PORT = '3000';

// não remova esse endpoint, e para o avaliador funcionar
app.get('/', (_request, response) => {
  response.status(HTTP_OK_STATUS).send();
});

app.get('/talker/search', middlewares.verifyToken, middlewares.searchName);

app.get('/talker', (_req, res) => {
  fs.readFile('./talker.json', (_err, data) => {
    res.status(HTTP_OK_STATUS).send(JSON.parse(data));
  });
});

app.get('/talker/:id', (req, res) => {
  const { id } = req.params;
  const talker = JSON.parse(fs.readFileSync('./talker.json'));
  const person = talker.find((pers) => pers.id === parseInt(id, 10));
  if (!person) return res.status(404).send({ message: 'Pessoa palestrante não encontrada' });
  res.status(HTTP_OK_STATUS).send(person);
});

app.post('/login', middlewares.verifyLogin);

app.post('/talker', middlewares.verifyToken, middlewares.verifyName, middlewares.verifyAge,
  middlewares.verifyTalk, middlewares.verifyTalkBody, middlewares.talkerVerified);

app.put('/talker/:id', middlewares.verifyToken, middlewares.verifyName, middlewares.verifyAge,
  middlewares.verifyTalk, middlewares.verifyTalkBody, middlewares.editedTalker);

app.delete('/talker/:id', middlewares.verifyToken, middlewares.deleteTalk);

app.listen(PORT, () => {
  console.log('Online');
});
