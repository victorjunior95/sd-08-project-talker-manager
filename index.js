const express = require('express');
const bodyParser = require('body-parser');
const rescue = require('express-rescue');
const middlewares = require('./middlewares');

const app = express();
app.use(bodyParser.json());

const HTTP_OK_STATUS = 200;
const PORT = '3000';

app.get('/talker', rescue(async (_req, res) => {
  const talker = await middlewares.lerJson();
  res.status(HTTP_OK_STATUS).json(talker);
}));

app.get('/talker/:id', rescue(async (req, res) => {
  const talker = await middlewares.lerJson();
  const { id } = req.params;
  const result = talker.find((pessoa) => pessoa.id === Number(id));

  if (!result) return res.status(404).send({ message: 'Pessoa palestrante não encontrada' });
  res.status(HTTP_OK_STATUS).json(result);
}));

// não remova esse endpoint, e para o avaliador funcionar
app.get('/', (_request, response) => {
  response.status(HTTP_OK_STATUS).send();
});

app.listen(PORT, () => {
  console.log('Online');
});
