const express = require('express');
const rescue = require('express-rescue');
const middlewares = require('../middlewares');
const { getTalkers, setTalkers } = require('../utils/fsTalker');
const { createTalker } = require('../services');

const talker = express.Router();

talker.get('/search', middlewares.authentication, rescue(async (req, res) => {
  const { q } = req.query;
  const talkers = await getTalkers();
  if (!q) return res.status(200).json(talkers);
  const filteredTalkers = talkers.filter(({ name }) => name.includes(q));
  res.status(200).json(filteredTalkers);
}));

talker.get('/', rescue(async (_req, res) => {
  const talkers = await getTalkers();
  res.status(200).json(talkers);
}));

talker.get('/:id', rescue(async (req, res) => {
  const { id } = req.params;
  const talkers = await getTalkers();
  const result = talkers.find((currentTalker) => currentTalker.id === Number(id));
  if (!result) return res.status(404).send({ message: 'Pessoa palestrante não encontrada' });
  res.status(200).json(result);
}));

talker.post('/', [
  middlewares.authentication,
  middlewares.name,
  middlewares.age,
  middlewares.talk,
  middlewares.watchedAt,
  middlewares.rate,
  rescue(async (req, res) => {
    const talkers = await getTalkers();
    const newTalker = createTalker(req.body, talkers.length + 1);
    talkers.push(newTalker);
    await setTalkers(talkers);
    res.status(201).json(newTalker);
  }),
]);

talker.put('/:id', [
  middlewares.authentication,
  middlewares.name,
  middlewares.age,
  middlewares.talk,
  middlewares.rate,
  middlewares.watchedAt,
  rescue(async (req, res) => {
    const { id } = req.params;
    const talkers = await getTalkers();
    const newTalker = createTalker(req.body, id);
    const newTalkers = talkers.map((currentTalker) => {
      if (currentTalker.id === Number(id)) return newTalker;
      return currentTalker;
    });
    await setTalkers(newTalkers);
    res.status(200).json(newTalker);
  }),
]);

talker.delete('/:id', middlewares.authentication, rescue(async (req, res) => {
  const { id } = req.params;
  const talkers = await getTalkers();
  const newTalkers = talkers.filter((currentTalker) => currentTalker.id !== Number(id));
  await setTalkers(newTalkers);
  res.status(200).json({ message: 'Pessoa palestrante deletada com sucesso' });
}));

module.exports = talker;
