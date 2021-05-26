const express = require('express');
const bodyParser = require('body-parser');
const fs = require('fs');

const app = express();
app.use(bodyParser.json());

const HTTP_OK_STATUS = 200;
const PORT = '3000';

app.listen(PORT, () => {
  console.log('Online');
});

// não remova esse endpoint, e para o avaliador funcionar
app.get('/', (_request, response) => {
  response.status(HTTP_OK_STATUS).send();
});

// Requisito 1
app.get('/talker', (_req, res) => {
  fs.readFile('./talker.json', (_err, data) => {
    res.status(HTTP_OK_STATUS).send(JSON.parse(data));
  });
});

// Requisito 2
app.get('/talker/:id', (req, res) => {
  const { id } = req.params;
  const palestrantes = JSON.parse(fs.readFileSync('./talker.json'));
  const pessoa = palestrantes.find((p) => p.id === parseInt(id, 10));
  if (!pessoa) return res.status(404).send({ message: 'Pessoa palestrante não encontrada' });
  res.status(HTTP_OK_STATUS).send(pessoa);
});
