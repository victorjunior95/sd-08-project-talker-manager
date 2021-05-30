const express = require('express');
const bodyParser = require('body-parser');
const fs = require('fs');
const tokenMiddleware = require('../middlewares/tokenMiddleware');
const nameMiddleware = require('../middlewares/nameMiddleware');
const ageMiddleware = require('../middlewares/ageMiddleware');
const talkMiddleware = require('../middlewares/talkMiddleware');
const talkIsValidMiddleware = require('../middlewares/talkIsValidMiddleware');

const app = express();
app.use(bodyParser.json());

app.get('/search', tokenMiddleware, (req, res) => { // localhost:3000/talker/search
  const { q } = req.query;
  const allTalkers = JSON.parse(fs.readFileSync(`${__dirname}/../talker.json`));
  const searchTerm = allTalkers.filter(({ name }) => name.includes(q));

  if (searchTerm) {
    res.status(200).json(searchTerm);
  }
  res.status(200).json(allTalkers);
});

app.get('/', (req, res) => { // localhost:3000/talker/
  const allTalkers = JSON.parse(fs.readFileSync(`${__dirname}/../talker.json`));
  res.status(200).json(allTalkers);
});

/* Referência (-- Exercício 3 --):
https://app.betrybe.com/course/back-end/nodejs/express-http-with-nodejs-practing/solutions
*/
app.get('/:id', (req, res) => { // localhost:3000/talker/:id
  const { id: reqId } = req.params;
  const allTalkers = JSON.parse(fs.readFileSync(`${__dirname}/../talker.json`));
  const talkerById = allTalkers.find(({ id }) => id === Number(reqId));

  if (talkerById) {
    res.status(200).json(talkerById);
  }
  res.status(404).json({ message: 'Pessoa palestrante não encontrada' });
});

app.use(tokenMiddleware);

app.delete('/:id', (req, res) => { // localhost:3000/talker/:id
  const { id } = req.params;
  const numId = Number(id);
  const allTalkers = JSON.parse(fs.readFileSync(`${__dirname}/../talker.json`));
  const index = numId - 1;
  allTalkers.splice(index, 1);
  fs.writeFileSync(`${__dirname}/../talker.json`, JSON.stringify(allTalkers));
  res.status(200).json({ message: 'Pessoa palestrante deletada com sucesso' });
});

app.use(nameMiddleware);
app.use(ageMiddleware);
app.use(talkMiddleware);
app.use(talkIsValidMiddleware);

app.post('/', (req, res) => { // localhost:3000/talker/
  const createTalker = req.body;
  const allTalkers = JSON.parse(fs.readFileSync(`${__dirname}/../talker.json`));
  createTalker.id = allTalkers.length + 1;
  allTalkers.push(createTalker);
  fs.writeFileSync(`${__dirname}/../talker.json`, JSON.stringify(allTalkers));
  res.status(201).json(createTalker);
});

app.put('/:id', (req, res) => { // localhost:3000/talker/:id
  const { id } = req.params;
  const allTalkers = JSON.parse(fs.readFileSync(`${__dirname}/../talker.json`));
  allTalkers[id - 1] = { id: Number(id), ...req.body };
  fs.writeFileSync(`${__dirname}/../talker.json`, JSON.stringify(allTalkers));
  res.status(200).json(allTalkers[id - 1]);
});

module.exports = app;