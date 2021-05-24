const express = require('express');
const bodyParser = require('body-parser');
const rescue = require('express-rescue');
const talkerUtils = require('./fs-utils');
const validationUser = require('./middlewares/authorization');

const app = express();
app.use(bodyParser.json());

const HTTP_OK_STATUS = 200;
const PORT = '3000';

app.get('/talker', rescue(async (_req, res) => {
  const talkers = await talkerUtils.getTalker();
    res.status(HTTP_OK_STATUS).json(talkers);
}));

app.get('/talker/:id', rescue(async (req, res) => {
  const talkers = await talkerUtils.getTalker();
  const talker = talkers.find(({ id }) => id === parseInt(req.params.id, 10));
  if (!talker) {
    return res.status(404).json({ message: 'Pessoa palestrante não encontrada' });
  }
  res.status(HTTP_OK_STATUS).json(talker);
}));

// não remova esse endpoint, e para o avaliador funcionar
app.get('/', (_request, response) => {
  response.status(HTTP_OK_STATUS).send();
});

app.post('/login', validationUser);

app.listen(PORT, () => {
  console.log('Online');
});
