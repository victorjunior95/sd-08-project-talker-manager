const express = require('express');
const bodyParser = require('body-parser');
const middlewares = require('../middlewares');
const utils = require('../utils');

const FILE = 'talker.json';

const router = express.Router();
router.use(bodyParser.json());

router.get('/', async (req, res) => {
  const talkers = await utils.getTalkers(FILE);
  res.status(200).send(talkers);
});

router.get('/:id', async (req, res) => {
  const { id } = req.params;
  const talkers = await utils.getTalkers(FILE);
  const talkerById = talkers.find((talker) => talker.id === parseInt(id, 10));
  if (!talkerById) res.status(404).send({ message: 'Pessoa palestrante não encontrada' });
  else res.status(200).json(talkerById);
});

router.use(middlewares.authToken);

router.post('/', middlewares.validateTalkerNameAndAge,
middlewares.validateTalk,
middlewares.validateDateAndRate,
  async (req, res) => {
  const talker = req.body;
  const talkers = await utils.getTalkers(FILE);
  const newTalker = { ...talker, id: talkers.length + 1 };
  await utils.setTalker(talkers, newTalker);
  res.status(201).json(newTalker);
});

router.put('/:id', middlewares.validateTalkerNameAndAge,
  middlewares.validateTalk,
  middlewares.validateDateAndRate,
  async (req, res) => {
  const id = parseInt(req.params.id, 10); 
  const updatedTalker = { ...req.body, id };
  const talkers = await utils.getTalkers(FILE);
  const updatedTalkers = talkers.map((talker) => {
    if (talker.id === id) return updatedTalker;
    return talker;
  });
  utils.updateTalkers(updatedTalkers);
  res.status(200).json(updatedTalker);
});

module.exports = router;