const express = require('express');
const bodyParser = require('body-parser');

const app = express();
app.use(bodyParser.json());

const HTTP_OK_STATUS = 200;
const PORT = '3000';

const fs = require('fs');

// não remova esse endpoint, e para o avaliador funcionar
app.get('/', (_request, response) => {
  response.status(HTTP_OK_STATUS).send();
});

app.get('/talker', (req, res, _next) => {
  const list = JSON.parse(fs.readFileSync('talker.json'));
  res.status(200).send(list);
});

app.get('/talker/:id', (req, res, _next) => {
  const { id } = req.params;
  const list = JSON.parse(fs.readFileSync('talker.json'));
  const search = list.find((index) => index.id === parseInt(id, 10));
  if (search === undefined) {
    return res.status(404).send({ message: 'Pessoa palestrante não encontrada' });
  }
  res.status(200).send(search);
});

app.listen(PORT, () => {
  console.log('Online');
});
