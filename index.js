const express = require('express');
const bodyParser = require('body-parser');
const fs = require('fs').promises;
const crypto = require('crypto');

const path = './talker.json';

const app = express();
app.use(bodyParser.json());

const HTTP_OK_STATUS = 200;
const PORT = '3000';

// não remova esse endpoint, e para o avaliador funcionar
app.get('/', (_request, response) => {
  response.status(HTTP_OK_STATUS).send();
});

// Req01
app.get('/talker', async (req, resp) => {
  const data = JSON.parse(await fs.readFile(path, 'utf-8'));
  resp.status(200).json(data);
});

// Req02
app.get('/talker/:id', async (req, resp) => {
  const { id } = req.params;
  // console.log(`id solicitado: ${id}`);
  const data = JSON.parse(await fs.readFile(path, 'utf-8'));
  // console.log(data);
  const searchId = data.find((el) => el.id === Number(id));
  // console.log(searchId);
  if (!searchId) {
    return resp.status(404).json({ message: 'Pessoa palestrante não encontrada' });
  }
  return resp.status(200).json(searchId);
});

// Req03
function loginCheck(req, resp, next) {
  const { email, password } = req.body;
  const emailRegex = /[^@ \t\r\n]+@[^@ \t\r\n]+\.[^@ \t\r\n]+/;
  const emailCheckFormat = emailRegex.test(email);
  if (!email) {
    return resp.status(400).json({ message: 'O campo "email" é obrigatório' });
  }
  if (!emailCheckFormat) {
    return resp.status(400).json({ message: 'O "email" deve ter o formato "email@email.com"' });
  }
  if (!password) {
    return resp.status(400).json({ message: 'O campo "password" é obrigatório' });
  }
  if (password.toString().length < 6) {
    return resp.status(400).json({ message: 'O "password" deve ter pelo menos 6 caracteres' });
  }
  return next();
}

app.post('/login', loginCheck, async (req, resp) => {
  const token = crypto.randomBytes(8).toString('hex');
  return resp.status(200).json({ token });
});

// Req04

app.listen(PORT, () => {
  console.log('Online');
});
