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
    return res.status(200).json(talkerById);
  }
  return res.status(404).json({ message: 'Pessoa palestrante não encontrada' });
});

app.use(tokenMiddleware);
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

module.exports = app;