const express = require('express');
const bodyParser = require('body-parser');
const fs = require('fs');

const app = express();
app.use(bodyParser.json());

const HTTP_OK_STATUS = 200;
const PORT = '3000';
const TALKER_PATH = './talker.json';

// não remova esse endpoint, e para o avaliador funcionar
app.get('/', (_request, response) => {
  response.status(HTTP_OK_STATUS).send();
});

app.get('/talker', (_request, response) => {
  const allTalkers = fs.readFileSync(TALKER_PATH, 'utf8');
  const parse = allTalkers ? JSON.parse(allTalkers) : null;
  if (!allTalkers || parse.length === 0) return response.status(200).send({});
  return response.status(HTTP_OK_STATUS).send(allTalkers);
});

app.listen(PORT, () => {
  console.log('Online');
});
