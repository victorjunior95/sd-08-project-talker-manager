const express = require('express');
const rescue = require('express-rescue');
const middlewares = require('../middlewares');
const { getFileContent, setFileContent } = require('../utils');
const { createTalker } = require('../services');

const TALKERFILE = './talker.json';

const talker = express.Router();

talker.get('/', rescue(async (_req, res) => {
  const talkers = await getFileContent(TALKERFILE);
  res.status(200).json(talkers);
}));

talker.get('/:id', rescue(async (req, res) => {
  const { id } = req.params;
  const talkers = await getFileContent(TALKERFILE);
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
    const talkers = await getFileContent(TALKERFILE);
    const newTalker = createTalker(req.body, talkers.length + 1);
    talkers.push(newTalker);
    await setFileContent(TALKERFILE, JSON.stringify(talkers, null, 2));
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
    const talkers = await getFileContent(TALKERFILE);
    const newTalker = createTalker(req.body, id);
    const newTalkers = talkers.map((currentTalker) => {
      if (currentTalker.id === Number(id)) return newTalker;
      return currentTalker;
    });
    await setFileContent(TALKERFILE, JSON.stringify(newTalkers, null, 2));
    res.status(200).json(newTalker);
  }),
]);

talker.delete('/:id', middlewares.authentication, rescue(async (req, res) => {
  const { id } = req.params;
  const talkers = await getFileContent(TALKERFILE);
  const newTalkers = talkers.filter((currentTalker) => currentTalker.id !== Number(id));
  await setFileContent(TALKERFILE, JSON.stringify(newTalkers, null, 2));
  res.status(200).json({ message: 'Pessoa palestrante deletada com sucesso' });
}));

module.exports = talker;
