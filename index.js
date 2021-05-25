const express = require('express');
const bodyParser = require('body-parser');
const crypto = require('crypto');

const app = express();
app.use(bodyParser.json());

const HTTP_OK_STATUS = 200;
const PORT = '3000';

// não remova esse endpoint, e para o avaliador funcionar
app.get('/', (_request, response) => {
  response.status(HTTP_OK_STATUS).send();
});

app.listen(PORT, () => {
  console.log('Online');
});

const rescue = require('express-rescue');
const fs = require('fs').promises;

function getTalker() {
  return fs.readFile('./talker.json', 'utf-8')
  .then((file) => JSON.parse(file));
}

// Crie o endpoint POST /login

const validateEmail = (email) => {
  const emailRegex = /^([a-zA-Z0-9_-]+)@([a-zA-Z0-9_-]+)/;
  return emailRegex.test(email);
};

// const validateEmail = (email) => {
//   const emailRegex = /^([a-zA-Z0-9_-]+)@([a-zA-Z0-9_-]+)/;
//   if (emailRegex.test(email) === true) {
//     return true;
//   }
//   return false;
// };

const validatePassword = (password) => (password.length >= 6);

const generateToken = () => crypto.randomBytes(8).toString('hex');

app.post('/login', rescue((req, res) => {
  const { body } = req;
  if (!body.email) {
    return res.status(400).json({ message: 'O campo "email" é obrigatório' });
  } if (!validateEmail(body.email)) {
    return res.status(400).json({
      message: 'O "email" deve ter o formato "email@email.com"',
    });
  } if (!body.password) {
    return res.status(400).json({
      message: 'O campo "password" é obrigatório',
    });
  } if (!validatePassword(body.password)) {
    return res.status(400).json({
      message: 'O "password" deve ter pelo menos 6 caracteres',
    });
  }
  return res.status(200).json({ token: generateToken(),
  });
}));

// Crie o endpoint GET /talker/:id

app.get(
  '/talker/:id',
  rescue(async (req, res) => {
    const talkers = await getTalker();

    const talker = talkers.find((ObjTalker) => ObjTalker.id === Number(req.params.id));

    if (!talker) {
      return res.status(404).json({ message: 'Pessoa palestrante não encontrada' });
    }
    return res.status(200).json(talker);
  }),
);

// 1 - Crie o endpoint GET /talker
app.get('/talker', rescue(async (_req, res) => {
  const talkers = await getTalker();
  res.status(200).json(talkers);
}));