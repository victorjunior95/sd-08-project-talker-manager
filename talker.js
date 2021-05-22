const express = require('express');
// const bodyParser = require('body-parser');

const { fsTalker, fsAdd } = require('./fsTalker.js');

const authorizationMid = require('./authorization');

const { nameAuth, ageAuth, talkAuth, watchedAuth, rateAuth } = require('./postMiddlewares');

const fileToRead = './talker.json';

const router = express.Router();

const addNewTalker = (id, data) => ({
  id,
  name: data.name,
  age: data.age,
  talk: {
    watchedAt: data.talk.watchedAt,
    rate: data.talk.rate,
  },
});

router.get('/', async (_req, res) => {
  const result = await fsTalker(fileToRead);
  if (!result) {
    return res.status(401);
  }
  return res.status(200).json(result);
});

router.get('/:id', async (req, res) => {
  const { id } = req.params;
  const results = await fsTalker(fileToRead);
  const findResult = results.find((person) => person.id === +id);
  console.log(findResult);
  if (!findResult) {
    return res.status(404).send({ message: 'Pessoa palestrante não encontrada' });
  }
  return res.status(200).json(findResult);
});

router.post('/', [
  authorizationMid,
  nameAuth,
  ageAuth,
  talkAuth,
  watchedAuth,
  rateAuth,
  async (req, res) => {
    const talkers = await fsTalker(fileToRead);
    const addTalker = addNewTalker(talkers.length + 1, req.body);
    talkers.push(addTalker);
    await fsAdd(JSON.stringify(talkers, null, 2));
    res.status(201).json(addTalker);
  },
]);

module.exports = router;
