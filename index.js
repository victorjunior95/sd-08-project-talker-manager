const express = require('express');
const bodyParser = require('body-parser');
// const rescue = require('express-rescue');
const middlewares = require('./middlewares');

const app = express();
app.use(bodyParser.json());

const HTTP_OK_STATUS = 200;
const HTTP_NOT_FOUND_STATUS = 404;
const PORT = '3000';

// não remova esse endpoint, e para o avaliador funcionar
app.get('/', (_request, response) => {
  response.status(HTTP_OK_STATUS).send();
});

app.get('/talker/:id', (req, res) => {
  const { id } = req.params;
  const talkerById = middlewares.readTalker()
    .find((element) => Number(element.id) === Number(id));
  if (talkerById) {
    return res.status(HTTP_OK_STATUS).json(talkerById);
  }
  return res.status(HTTP_NOT_FOUND_STATUS).json({
    message: 'Pessoa palestrante não encontrada',
  });
});

app.get('/talker', (_req, res) => {
  const talker = middlewares.readTalker();
  return res.status(HTTP_OK_STATUS).json(talker);
});

app.listen(PORT, () => {
  console.log('Online');
});
