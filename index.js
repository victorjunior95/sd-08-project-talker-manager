const express = require('express');
const fs = require('fs');
const crypto = require('crypto');
const bodyParser = require('body-parser');

const {
  validationLogin,
} = require('./authMiddleware');

const app = express();
app.use(bodyParser.json());

const HTTP_OK_STATUS = 200;
const NOT_FOUND_STATUS = 404;
const PORT = '3000';

// não remova esse endpoint, e para o avaliador funcionar
app.get('/', (_request, response) => {
  response.status(HTTP_OK_STATUS).send();
});

app.get('/talker/:id', (req, res) => {
  const data = JSON.parse(fs.readFileSync('talker.json', 'utf-8'));
  const { id } = req.params;
  const talkerIdFilter = data.find((talker) => talker.id === Number(id));

  if (!talkerIdFilter) {
    return res
      .status(NOT_FOUND_STATUS)
      .json({ message: 'Pessoa palestrante não encontrada' });
  }
  res.status(HTTP_OK_STATUS).json(talkerIdFilter);
});

app.get('/talker', (_req, res) => {
  const content = fs.readFileSync('talker.json', 'utf-8');
  const allTalkers = JSON.parse(content);

  if (allTalkers.length === 0) return res.status(HTTP_OK_STATUS).json([]);
  res.status(HTTP_OK_STATUS).json(allTalkers);
});

app.post('/login', validationLogin, (_req, res) => {
  /* Info about crypto.randomBytes method found at
  https://www.geeksforgeeks.org/node-js-crypto-randombytes-method/ */
  const token = crypto
    .randomBytes(64)
    .toString('base64')
    .replace([/[+]/, /[/]/], '')
    .substring(0, 16);
  res.status(HTTP_OK_STATUS).send({ token });
});

app.listen(PORT, () => {
  console.log('Online');
});
