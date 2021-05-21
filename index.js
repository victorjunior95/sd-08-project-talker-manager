const express = require('express');
const bodyParser = require('body-parser');
const util = require('./util');

const app = express();
app.use(bodyParser.json());

const PORT = '3000';

app.get('/', (_request, response) => {
  response.status(200).send();
});

app.get('/talker', (_request, response) => {
  const allTalkers = util.getAllTalkers();

  return allTalkers
    ? response.status(200).json(allTalkers)
    : response.status(200).json([]);
});

app.get('/talker/:id', (request, response) => {
  const { id } = request.params;
  const allTalkers = util.getAllTalkers();
  const talkerById = allTalkers.find((talker) => talker.id === parseInt(id, 10));

  return talkerById 
   ? response.status(200).json(talkerById)
   : response.status(404).json({ message: 'Pessoa palestrante não encontrada' });
});

app.listen(PORT, () => {
  console.log('Online');
});
