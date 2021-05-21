const express = require('express');
const bodyParser = require('body-parser');
const fs = require('fs').promises;

const app = express();
app.use(bodyParser.json());

const HTTP_OK_STATUS = 200;
const PORT = '3000';

// não remova esse endpoint, e para o avaliador funcionar
app.get('/', (_request, response) => {
  response.status(HTTP_OK_STATUS).send();
});

app.get('/talker/:id', async (request, response) => {
  const { id } = request.params;
  const talkers = await fs.readFile(`${__dirname}/talker.json`, 'utf-8')
  .then((data) => JSON.parse(data))
  .catch((err) => console.log(err));
  const talker = talkers.find((person) => person.id === id);
  if (!talker) return response.status(404).json({ message: 'Pessoa palestrante não encontrada' });
  response.status(200).json(talker);
});

app.get('/talker', async (_request, response) => {
  const file = await fs.readFile(`${__dirname}/talker.json`, 'utf-8')
    .then((data) => JSON.parse(data))
    .catch((err) => console.log(err));
  response.status(200).json(file);
});

app.listen(PORT, () => {
  console.log('Online');
});
