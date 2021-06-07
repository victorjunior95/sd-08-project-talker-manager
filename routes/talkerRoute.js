const express = require('express');

const Talker = require('../middleware/talkerMiddleware');

const route = express.Router();

route.get('/search', Talker.findByQuery, (req, res) => {
  res.status(200).json(req.talkers);
});

route.get('/', Talker.getAll, (req, res) => {
  res.status(200).json(req.talker);
});

route.get('/:id', Talker.getById, (req, res) => {
  res.status(200).json(req.talker);
});

route.post('/', Talker.createTalker, (req, res) => {
  res.status(201).json(req.talker);
});

route.put('/:id', Talker.update, (req, res) => {
  res.status(200).json(req.updatedTalker);
});

route.delete('/:id', Talker.deleteTalker, (_req, res) => {
  res.status(200).json({ message: 'Pessoa palestrante deletada com sucesso' });
});

route.use(Talker.erroHandlerMiddleware);

module.exports = route;
