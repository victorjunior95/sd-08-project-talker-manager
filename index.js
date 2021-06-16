const express = require('express');
const bodyParser = require('body-parser');
const fs = require('fs');
const { findTalkerByID } = require('./functions');

const app = express();
app.use(bodyParser.json());

const HTTP_OK_STATUS = 200;
const PORT = '3000';
const TALKER_PATH = './talker.json';
const MESSAGES = {
  idNotFound: 'Pessoa palestrante não encontrada',
};

// não remova esse endpoint, e para o avaliador funcionar
app.get('/', (_request, response) => {
  response.status(HTTP_OK_STATUS).send();
});

app.get('/talker', (_request, response) => {
  const getAllTalkers = fs.readFileSync(TALKER_PATH, 'utf8');
  const talkers = getAllTalkers ? JSON.parse(getAllTalkers) : null;
  if (!talkers) return response.status(200).send({});
  return response.status(HTTP_OK_STATUS).send(talkers);
});

app.get('/talker/:id', (req, res) => {
  const getAllTalkers = fs.readFileSync(TALKER_PATH, 'utf8');
  const talkers = getAllTalkers ? JSON.parse(getAllTalkers) : null;
  const talker = findTalkerByID(talkers, req.params.id);
  if (!talker) return res.status(404).send({ message: MESSAGES.idNotFound });
  return res.status(HTTP_OK_STATUS).send(talker);
});

app.listen(PORT, () => {
  console.log('Online');
});
