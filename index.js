const express = require('express');
const bodyParser = require('body-parser');
const fs = require('fs').promises;
const randtoken = require('rand-token');
// const path = require('path');

const app = express();
app.use(bodyParser.json());

const SUCCESS = 200;
// const CREATED = 201;
const BAD_REQUEST = 400;
// const UNAUTHORIZED = 401;
const NOT_FOUND = 404;
// const PORT_3000 = 3000;
const PORT = '3000';

const TALKER_FILE = 'talker.json';
const VALID_EMAIL_REGEX = /\S+@\S+\.\S+/;

// não remova esse endpoint, e para o avaliador funcionar
app.get('/', (_request, response) => {
  response.status(SUCCESS).send();
});

// Requisito 01
app.get('/talker', async (req, res) => {
  const data = await fs.readFile(TALKER_FILE);

  if (!data) {
    return res.status(SUCCESS).send([]);
  }

  return res.status(SUCCESS).send(JSON.parse(data));
});

// Requisito 02
app.get('/talker/:id', async (req, res) => {
  const { id } = req.params;

  const data = await fs.readFile(TALKER_FILE);

  const findTalker = JSON.parse(data).find((e) => e.id === parseInt(id, 10));

  if (!findTalker) {
    return res
      .status(NOT_FOUND)
      .send({ message: 'Pessoa palestrante não encontrada' });
  }

  return res.status(SUCCESS).send(findTalker);
});

const validateEmail = (email) => {
  if (!email || email === '') {
    return { message: 'O campo "email" é obrigatório' };
  }
  if (!VALID_EMAIL_REGEX.test(email)) {
    return { message: 'O "email" deve ter o formato "email@email.com"' };
  }
  return true;
};

const validatePassword = (password) => {
  if (!password || password === '') {
    return { message: 'O campo "password" é obrigatório' };
  }
  if (password.toString().length < 6) {
    return { message: 'O "password" deve ter pelo menos 6 caracteres' };
  }
  return true;
};

// Requisito 03
app.post('/login', (req, res) => {
  const { email, password } = req.body;
  const isEmailValid = validateEmail(email);
  const isPasswordValid = validatePassword(password);

  if (typeof isEmailValid === 'object') {
    return res.status(BAD_REQUEST).send(isEmailValid);
  }

  if (typeof isPasswordValid === 'object') {
    return res.status(BAD_REQUEST).send(isPasswordValid);
  }

  const token = randtoken.generate(16);

  return res.status(SUCCESS).send({ token: `${token}` });
});

app.listen(PORT, () => {
  console.log('Online');
});
