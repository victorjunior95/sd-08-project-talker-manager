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
app.get('/talker', (req, res) => {
  const result = JSON.parse(fs.readFileSync('./talker.json', 'utf8'));
  res.status(200).json(result);
});

app.get('/talker/:id', (req, res) => {
  const { id } = req.params;
  const talkers = JSON.parse(fs.readFileSync('./talker.json', 'utf8'));
  const result = talkers.find((talker) => talker.id === Number(id));
  if (result) {
    res.status(200).json(result);
  }
  res.status(404).json({ message: 'Pessoa palestrante não encontrada' });
});

app.listen(PORT, () => {
  console.log('Online');
});
