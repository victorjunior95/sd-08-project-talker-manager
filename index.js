const express = require('express');
const bodyParser = require('body-parser');
const { getDB, pushTalker, getLastTalker } = require('./services/handleDB');

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
  console.log(getDB);
  console.log(req.body);
  const newTalker = req.body;
  pushTalker(newTalker);
  console.log(getLastTalker());
  res.status(201).json(getLastTalker());
  },
  
);

app.listen(PORT, () => {
  console.log('Online');
});
