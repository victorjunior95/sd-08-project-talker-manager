const express = require('express');
const middlewares = require('../middlewares');

const talker = express.Router();

talker.get('/search', middlewares.authentication, middlewares.talker.search);

talker.get('/', middlewares.talker.getAll);

talker.get('/:id', middlewares.talker.getById);

talker.post('/', [
  middlewares.authentication,
  middlewares.name,
  middlewares.age,
  middlewares.talk,
  middlewares.watchedAt,
  middlewares.rate,
  middlewares.talker.create,
]);

talker.put('/:id', [
  middlewares.authentication,
  middlewares.name,
  middlewares.age,
  middlewares.talk,
  middlewares.rate,
  middlewares.watchedAt,
  middlewares.talker.updateById,
]);

talker.delete('/:id', middlewares.authentication, middlewares.talker.deleteById);

module.exports = talker;
