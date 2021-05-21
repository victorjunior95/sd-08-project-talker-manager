const express = require('express');
const bodyParser = require('body-parser');
const fs = require('fs');

const app = express();
app.use(bodyParser.json());

const HTTP_OK_STATUS = 200;
const PORT = '3000';

// não remova esse endpoint, e para o avaliador funcionar
app.get('/', (_request, response) => {
  response.status(HTTP_OK_STATUS).send();
});

app.listen(PORT, () => {
  console.log('Online...');
});

const getAllTalkers = (_req, res, _next) => {
  const rawdata = fs.readFileSync('talker.json');
  const talkers = JSON.parse(rawdata);
  if (!talkers.length) {
    return res.status(200).json([]);
  }
  res.status(200).json(talkers);
};

app.get('/talker', getAllTalkers);