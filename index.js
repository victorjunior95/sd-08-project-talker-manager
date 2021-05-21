const express = require('express');
const bodyParser = require('body-parser');
const rescue = require('express-rescue');
const fs = require('fs/promises');

const app = express();
app.use(bodyParser.json());

const HTTP_OK_STATUS = 200;
const PORT = '3000';

app.get('/talker', rescue(async (req, res) => {
  const talker = await (fs.readFile('./talker.json', 'utf-8'));
  if (JSON.parse(talker).length === 0) return res.status(200).json();
  res.status(200).json(JSON.parse(talker));
}));

// não remova esse endpoint, e para o avaliador funcionar
app.get('/', (_request, response) => {
  response.status(HTTP_OK_STATUS).send();
});

app.listen(PORT, () => {
  console.log('Online');
});
