const express = require('express');
// const bodyParser = require('body-parser');

const fsTalker = require('./fsTalker.js');

const fileToRead = './talker.json';

const router = express.Router();

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

module.exports = router;
