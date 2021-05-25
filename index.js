const express = require('express');
const bodyParser = require('body-parser');
const { pushTalker, getLastTalker, editTalker } = require('./services/handleDB');

const { allTalkers, talkerById, loginValidation } = require('./middlewares');
const { 
  validateToken,
  validateName, 
  validateAge, 
  validateTalkIsEmpty,
  validateTalk,
} = require('./middlewares/validation');

const app = express();
app.use(bodyParser.json());

const HTTP_OK_STATUS = 200;
const PORT = '3000';

// não remova esse endpoint, e para o avaliador funcionar
app.get('/', (_request, response) => {
  response.status(HTTP_OK_STATUS).send();
});

app.get('/talker/:id', talkerById);

app.get('/talker', allTalkers);

app.post('/login', loginValidation);

app.post(
  '/talker',
  validateToken,
  validateName,
  validateAge,
  validateTalkIsEmpty,
  validateTalk,
  (req, res) => {
  const newTalker = req.body;
  pushTalker(newTalker);
  res.status(201).json(getLastTalker());
  },
);

app.put(
  '/talker/:id',
  validateToken,
  validateName,
  validateAge,
  validateTalkIsEmpty,
  validateTalk,
  (req, res) => {
    const updatedTalker = req.body;
    const id = Number(req.params.id);
    const pastTalker = editTalker(updatedTalker, id);
    res.status(200).json(pastTalker);
  },
);

app.listen(PORT, () => {
  console.log('Online');
});
