const express = require('express');
const rescue = require('express-rescue');
const getFileContent = require('../utils/getFileContent');

const talker = express.Router();

talker.get('/', rescue(async (_req, res) => {
  const talkers = await getFileContent('./talker.json');
  res.status(200).json(talkers);
}));

talker.get('/:id', rescue(async (req, res) => {
  const { id } = req.params;
  const talkers = await getFileContent('./talker.json');
  const result = talkers.find((currentTalker) => currentTalker.id === Number(id));
  if (!result) res.status(404).send({ message: 'Pessoa palestrante não encontrada' });
  res.status(200).json(result);
}));

module.exports = talker;
