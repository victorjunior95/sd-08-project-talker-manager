const express = require('express');
const bodyParser = require('body-parser');
const talker = require('./service');
const middlewares = require('./middlewares');

const app = express();
app.use(bodyParser.json());

const HTTP_OK_STATUS = 200;
const PORT = '3000';

// não remova esse endpoint, e para o avaliador funcionar
app.get('/', (_request, response) => {
  response.status(HTTP_OK_STATUS).send();
});

app.get('/talker', async (_req, res) => {
  const data = await talker();
  return res.status(200).json(data);
});

app.get('/talker/:id', async (req, res) => {
  const data = await talker();
  const dataById = data.find((item) => parseInt(item.id, 0) === parseInt(req.params.id, 0));
  if (!dataById) {
    return res.status(404).json({ message: 'Pessoa palestrante não encontrada' });
  }
  return res.status(200).json(dataById);
});

app.post('/login', middlewares.login);

app.listen(PORT, () => {
  console.log('Online');
});
