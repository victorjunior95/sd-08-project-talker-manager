const express = require('express');
const fs = require('fs');

const talker = () => JSON.parse(fs.readFileSync('talker.json', 'utf-8'));

const app = express();
app.use(express.json());

const HTTP_OK_STATUS = 200;
const PORT = '3000';

// não remova esse endpoint, e para o avaliador funcionar
app.get('/', (_request, response) => {
  response.status(HTTP_OK_STATUS).send();
});

app.get('/talker', (_req, res) => {
  const rawTalker = talker();
  if (rawTalker.length === 0) return res.status(200).json([]);
  res.status(200).json(rawTalker);
});

app.listen(PORT, () => {
  console.log('Online');
});
