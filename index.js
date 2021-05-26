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

app.get('/talker', (req, res) => {
  fs.readFile('./talker.json', (err, data) => {
    res.status(HTTP_OK_STATUS).send(JSON.parse(data));
  });
});

app.get('/talker/:id', (req, res) => {
  const { id } = req.params;
  const talkers = JSON.parse(fs.readFileSync('./talker.json'));
  const returnTalk = talkers.find((talker) => talker.id === parseInt(id, 10));
  if (!returnTalk) return res.status(404).send({ message: 'Pessoa palestrante não encontrada' });
  res.status(HTTP_OK_STATUS).send(returnTalk);
});

app.post('/login', middlewares.validaLogin);

app.post('/talker', middlewares.validaToken, middlewares.validaNome, middlewares.validaAno,
  middlewares.validaTalk, middlewares.validaBody);

app.listen(PORT, () => {
  console.log('Online');
});
