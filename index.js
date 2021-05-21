const express = require('express');
const bodyParser = require('body-parser');
const fs = require('fs').promises;
const crypto = require('crypto');

const app = express();
app.use(bodyParser.json());

const HTTP_OK_STATUS = 200;
const PORT = '3000';

// não remova esse endpoint, e para o avaliador funcionar
app.get('/', (_request, response) => {
  response.status(HTTP_OK_STATUS).send();
});

app.get('/talker/:id', async (request, response) => {
  const { id } = request.params;

  const talkers = await fs.readFile(`${__dirname}/talker.json`, 'utf-8')
  .then((data) => JSON.parse(data))
  .catch((err) => console.log(err));
  const talker = talkers.find((person) => person.id === Number(id));
  if (!talker) {
    return response.status(404).json({ message: 'Pessoa palestrante não encontrada' });
  }
  response.status(200).json(talker);
});

app.get('/talker', async (_request, response) => {
  const file = await fs.readFile(`${__dirname}/talker.json`, 'utf-8')
    .then((data) => JSON.parse(data))
    .catch((err) => console.log(err));
  response.status(200).json(file);
});

app.post('/login', (request, response) => {
  const { email, password } = request.body;
  const emailRegex = /.+@[A-z]+[.]com/;
  const isEmailValid = emailRegex.test(email);
  if (!email) return response.status(400).json({ message: 'O campo "email" é obrigatório' });
  if (!isEmailValid) {
    return response.status(400)
    .json({ message: 'O "email" deve ter o formato "email@email.com"' });
  }
  if (!password) {
    return response.status(400)
      .json({ message: 'O campo "password" é obrigatório' });
  }
  if (password.toString().length < 6) {
    return response.status(400)
      .json({ message: 'O "password" deve ter pelo menos 6 caracteres' });
  }
  response.status(200).json({ token: crypto.randomBytes(8).toString('hex') });
});

app.listen(PORT, () => {
  console.log('Online');
});
