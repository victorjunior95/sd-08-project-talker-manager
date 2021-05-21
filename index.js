const express = require('express');
const bodyParser = require('body-parser');
const talker = require('./talker.json');

const app = express();

app.use(bodyParser.json());

const HTTP_OK_STATUS = 200;
const PORT = '3000';

// não remova esse endpoint, e para o avaliador funcionar
app.get('/', (_request, response) => {
  response.status(HTTP_OK_STATUS).send();
});

app.get('/talker', (_request, response) => {
  response.status(HTTP_OK_STATUS).send(talker);
});

app.get('/talker/:id', (req, response) => {
  const { id } = req.params;
  const person = talker.filter((element) => element.id === Number(id));
  if (person.length === 0) {
    return response.status(404)
    .send({ message: 'Pessoa palestrante não encontrada' });
  }
  response.status(HTTP_OK_STATUS).send(person[0]);
});

app.listen(PORT, () => {
  console.log('Online');
});
