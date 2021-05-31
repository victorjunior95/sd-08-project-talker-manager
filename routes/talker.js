const express = require('express');
const bodyParser = require('body-parser');
const middlewares = require('../middlewares');
const utils = require('../utils');

const router = express.Router();
router.use(bodyParser.json());

router.get('/', async (req, res) => {
  const talkers = await utils.getTalkers('talker.json');
  res.status(200).send(talkers);
});

router.get('/:id', async (req, res) => {
  const { id } = req.params;
  const talkers = await utils.getTalkers('talker.json');
  const talkerById = talkers.find((talker) => talker.id === parseInt(id, 10));
  if (!talkerById) res.status(404).send({ message: 'Pessoa palestrante não encontrada' });
  else res.status(200).json(talkerById);
});

router.post('/', middlewares.authToken, middlewares.validateTalkerNameAndAge,
  middlewares.validateTalkKeys,
  middlewares.validateDateAndTalk,
  async (req, res) => {
  const talker = req.body;
  const talkers = await utils.getTalkers('talker.json');
  const newTalker = { ...talker, id: talkers.length + 1 };
  await utils.setTalker(talkers, newTalker);
  res.status(201).json(newTalker);
});

module.exports = router;