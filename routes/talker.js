const express = require('express');
const { readData, verifyToken, verifyTalkerBody,
  updateTalkers, filterName } = require('../middlewares');

const route = express.Router();

const filterNameMiddles = [verifyToken, filterName];
const deleteMiddles = updateTalkers;
const postAndPutMiddles = [...verifyTalkerBody, updateTalkers];

route.use(readData('./talker.json'));

route.get('/search', filterNameMiddles, (req, res) => {
  res.status(200).json(req.search);
});

route.get('/', (req, res) => {
  res.status(200).json(req.readData);
});

route.get('/:id', ((req, res) => {
  const { id } = req.params;
  const choosedTalker = req.readData.find((talker) => talker.id === parseInt(id, 10));
  if (!choosedTalker) return res.status(404).json({ message: 'Pessoa palestrante não encontrada' });
  res.status(200).json(choosedTalker);
}));

route.use(verifyToken);

route.post('/', postAndPutMiddles, (req, res) => {
  res.status(201).json(req.talker);
});

route.put('/:id', postAndPutMiddles, (req, res) => {
  res.status(200).json(req.talker);
});

route.delete('/:id', deleteMiddles, (_req, res) => {
  res.status(200).json({ message: 'Pessoa palestrante deletada com sucesso' });
});

module.exports = route;