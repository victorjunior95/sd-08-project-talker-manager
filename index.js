const express = require('express');
const bodyParser = require('body-parser');
const rescue = require('express-rescue');
const talkerUtils = require('./fs-utils');
const validationUser = require('./middlewares/authorization');
const addTalker = require('./middlewares/addTalker');
const
{ 
  validationToken,
  validationName,
  validationAge,
  validationTalk,
  validationRateAndDate,
   } = require('./middlewares/validationTalkerInfo');
const updateTalker = require('./middlewares/updateTalker');
const deleteTalker = require('./middlewares/deleteTalker');

const app = express();
app.use(bodyParser.json());

const HTTP_OK_STATUS = 200;
const PORT = '3000';

// não remova esse endpoint, e para o avaliador funcionar
app.get('/', (_request, response) => {
  response.status(HTTP_OK_STATUS).send();
});

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

app.post('/login', validationUser);

app.post(
  '/talker',
  validationToken,
  validationName,
  validationAge,
  validationTalk,
  validationRateAndDate,
  addTalker,
);

app.put(
  '/talker/:id',
  validationToken,
  validationName,
  validationAge,
  validationTalk,
  validationRateAndDate,
  updateTalker,
);

app.delete('/talker/:id', validationToken, deleteTalker);

app.listen(PORT, () => {
  console.log('Online');
});
