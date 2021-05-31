const express = require('express');
const bodyParser = require('body-parser');

const fs = require('fs').promises;
const auth = require('./middlewares/auth');
const nameValidation = require('./services/nameValidation');
const ageValidation = require('./services/ageValidation');
const talkValidation = require('./services/talkValidation');
const rateValidation = require('./services/rateValidation');
const dateValidation = require('./services/dateValidation');
const registerUser = require('./services/registerUser');
const updateUser = require('./services/updateUser');
const deleteUser = require('./services/deleteUser');
const searchUser = require('./services/searchUser');

const app = express();
app.use(bodyParser.json());

const HTTP_OK_STATUS = 200;
const PORT = '3000';

app.get('/talker', (_req, res) => {
  console.log('get geral');
  fs.readFile('talker.json')
    .then((data) => {
      res.status(200).json(JSON.parse(data));
    })
    .catch(() => {
      res.status(200).send([]);
    });
});

app.get('/talker/search', auth, searchUser);

app.get('/talker/:id', (req, res) => {
  console.log('get by id');
  fs.readFile('talker.json')
    .then((data) => {
      const { id } = req.params;

      const answer = JSON.parse(data).find((item) => item.id === Number(id));

      if (answer) {
        return res.status(200).send(answer);
      }

      res.status(404).json({ message: 'Pessoa palestrante não encontrada' });
    });
});

app.delete('/talker/:id', auth, deleteUser);

app.put(
  '/talker/:id',
  auth,
  nameValidation,
  ageValidation,
  talkValidation,
  rateValidation,
  dateValidation,
  updateUser,
);

app.post(
  '/talker',
  auth,
  nameValidation,
  ageValidation,
  talkValidation,
  rateValidation,
  dateValidation,
  registerUser,
);

function validateEmail(email) {
  const re = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i;
  return re.test(String(email).toLowerCase());
}

app.post('/login', (req, res) => {
  const { email, password } = req.body;
  if (!email) {
    return res.status(400).json({ message: 'O campo "email" é obrigatório' });
  }
  if (!validateEmail(email)) {
    return res.status(400).json({ message: 'O "email" deve ter o formato "email@email.com"' });
  }
  if (!password) {
    return res.status(400).json({ message: 'O campo "password" é obrigatório' });
  }
  if (password.toString().length < 6) {
    return res.status(400).json({ message: 'O "password" deve ter pelo menos 6 caracteres' });
  }

  res.status(200).json({ token: '7mqaVRXJSp886CGr' });
});

// não remova esse endpoint, e para o avaliador funcionar
app.get('/', (_request, response) => {
  response.status(HTTP_OK_STATUS).send();
});

app.listen(PORT, () => {
  console.log('Online');
});
