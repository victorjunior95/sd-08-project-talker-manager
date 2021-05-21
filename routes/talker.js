const express = require('express');
const { readData } = require('../middlewares');

const route = express.Router();

route.use(readData('./talker.json'));

route.get('/', (req, res) => {
  res.status(200).json(req.readData);
});

route.get('/:id', ((req, res) => {
  const { id } = req.params;
  const choosedTalker = req.readData.find((talker) => talker.id === parseInt(id, 10));
  if (!choosedTalker) return res.status(404).json({ message: 'Pessoa palestrante não encontrada' });
  res.status(200).json(choosedTalker);
}));

module.exports = route;