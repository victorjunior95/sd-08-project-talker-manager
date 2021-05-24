const express = require('express');
const bodyParser = require('body-parser');
const fs = require('fs').promises;
const crypto = require('crypto');

const middlewares = require('./middlewares');

const talkersFile = './talker.json';

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
  const talkers = JSON.parse(await fs.readFile(talkersFile, 'utf-8'));
  res.status(200).json(talkers);
});

app.get('/talker/search', [
  middlewares.validateToken,
  async (req, res) => {
    const { q } = req.query;
    const talkers = JSON.parse(await fs.readFile(talkersFile, 'utf-8'));
    if (!q) res.status(200).json(talkers);
    const filteredTalkers = talkers.filter((talker) => talker.name.includes(q));
    res.status(200).json(filteredTalkers);
  },
]);

app.get('/talker/:id', async (req, res) => {
  const { id } = req.params;
  const talkers = JSON.parse(await fs.readFile(talkersFile, 'utf-8'));
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

app.post('/talker', [
  middlewares.validateNewTalker,
  async (req, res) => {
    const talkers = JSON.parse(await fs.readFile(talkersFile, 'utf-8'));
    const newTalker = req.body;
    newTalker.id = talkers.length + 1;
    talkers.push(newTalker);
    await fs.writeFile(talkersFile, JSON.stringify(talkers));
    res.status(201).json(newTalker);
  },
]);

app.put('/talker/:id', [
  middlewares.validateEditTalker,
  async (req, res) => {
    const { id } = req.params;
    const talkers = JSON.parse(await fs.readFile(talkersFile, 'utf-8'));
    const newTalker = req.body;
    newTalker.id = parseInt(id, 10);
    let index = talkers.findIndex((talker) => talker.id === parseInt(id, 10));
    console.log(index);
    if (index === -1) index = talkers.length + 1;
    talkers[index] = newTalker;
    console.log(talkers);
    await fs.writeFile(talkersFile, JSON.stringify(talkers));
    res.status(200).json(newTalker);
  },
]);

app.delete('/talker/:id', [
  middlewares.validateToken,
  async (req, res) => {
    console.log('aqui');
    const { id } = req.params;
    const talkers = JSON.parse(await fs.readFile(talkersFile, 'utf-8'));
    const index = talkers.findIndex((talker) => talker.id === parseInt(id, 10));
    talkers.splice(index, 1);
    await fs.writeFile(talkersFile, JSON.stringify(talkers));
    res.status(200).json({
      message: 'Pessoa palestrante deletada com sucesso',
    });
  },
]);

app.use(middlewares.handleErrors);

app.listen(PORT, () => {
  console.log('Online');
});
