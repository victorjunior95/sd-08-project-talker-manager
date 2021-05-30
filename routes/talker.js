const express = require('express');
const bodyParser = require('body-parser');
const utils = require('../utils');

const router = express.Router();
router.use(bodyParser.json());

router.get('/', async (_req, res) => {
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

module.exports = router;