const express = require('express');
const fs = require('fs');

const talker = fs.readFileSync('talker.json');
const rawTalker = JSON.parse(talker);

const app = express();
app.use(express.json());

const HTTP_OK_STATUS = 200;
const PORT = '3000';

// não remova esse endpoint, e para o avaliador funcionar
app.get('/', (_request, response) => {
  response.status(HTTP_OK_STATUS).send();
});

app.get('/talker', (_req, res) => {
  res.status(200).json(rawTalker);
});

app.listen(PORT, () => {
  console.log('Online');
});
