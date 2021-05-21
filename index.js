const express = require('express');
const bodyParser = require('body-parser');
const rescue = require('express-rescue');

const registeredSpeakers = require('./fs-utils');

const app = express();
app.use(bodyParser.json());

const HTTP_OK_STATUS = 200;
const PORT = '3000';

app.get('/talker', rescue(async (req, res) => {
  const talkers = await registeredSpeakers.getRegisteredSpeakers();
  res.status(200).json(talkers);
}));

app.get('/talker/:id', rescue(async (req, res) => {
  const talkers = await registeredSpeakers.getRegisteredSpeakers();
  const talkerById = talkers.find((talker) => 
  parseInt(talker.id, 0) === parseInt(req.params.id, 0));

  if (!talkerById) {
    return res.status(404).json({ message: 'Pessoa palestrante não encontrada' });
  }
  return res.status(200).json(talkerById);
}));

// não remova esse endpoint, e para o avaliador funcionar
app.get('/', (_request, response) => {
  response.status(HTTP_OK_STATUS).send();
});

app.listen(PORT, () => {
  console.log('Online');
});
