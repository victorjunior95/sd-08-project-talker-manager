const express = require('express');
const testToken = require('./Middlewares/checkToken');
const checkTalker = require('./Middlewares/checkTalker');
const readTalkers = require('./Middlewares/readTalkers');
const writeTalkers = require('./Middlewares/writeTalkers');

let talkers = [];

const router = express.Router();

router.post('/', (req, res) => {
  testToken(req.headers.authorization, res);
  checkTalker(req, res);
  talkers = readTalkers(talkers);
  const newId = talkers.length + 1;
  // const sNewId = String(newId);
  talkers[newId] = { id: newId, ...req.body };
  console.log(talkers);
  writeTalkers(talkers);
  return res.status(201).json({ id: newId, ...req.body });
});

router.get('/', (_req, res) => {
  talkers = readTalkers(talkers);
  res.status(200).json(talkers);
});

router.get('/:id', (req, res) => {
  talkers = readTalkers(talkers);
  const { id } = req.params;
  const talkerId = talkers.find((talker) => talker.id === Number(id));
  if (!talkerId) {
    res.status(404).json({ message: 'Pessoa palestrante não encontrada' });
  }
  res.status(200).json(talkerId);
});
module.exports = router;