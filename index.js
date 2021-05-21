const express = require('express');
const bodyParser = require('body-parser');
const fs = require('fs').promises;
const crypto = require('crypto');

const middlewares = require('./middlewares');

// Função utilizada nos exercícios bonus do Bloco 26 dia 4 do Course
function generateToken() {
  return crypto.randomBytes(8).toString('hex');
}

const app = express();
app.use(bodyParser.json());

const HTTP_OK_STATUS = 200;
const PORT = '3000';

// não remova esse endpoint, e para o avaliador funcionar
app.get('/', (_request, response) => {
  response.status(HTTP_OK_STATUS).send();
});

app.get('/talker', async (_req, res) => {
  const talkers = JSON.parse(await fs.readFile('./talker.json', 'utf-8'));
  res.status(200).json(talkers);
});

app.get('/talker/:id', async (req, res) => {
  const { id } = req.params;
  const talkers = JSON.parse(await fs.readFile('./talker.json', 'utf-8'));
  const talker = talkers.find((person) => person.id === parseInt(id, 10));
  if (!talker) res.status(404).json({ message: 'Pessoa palestrante não encontrada' });
  res.status(200).json(talker);
});

app.post('/login', [
  middlewares.validateLogin,
  (_req, res) => {
    const token = generateToken();
    res.status(200).json({ token });
  },
]);

app.use(middlewares.handleErrors);

app.listen(PORT, () => {
  console.log('Online');
});
