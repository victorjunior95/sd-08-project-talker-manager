const express = require('express');

const middlewares = require('../middlewares');

const routeTalker = express.Router();

const HTTP_OK_STATUS = 200;
const HTTP_NOT_FOUND_STATUS = 404;

routeTalker.get('/', (_req, res) => {
  const talker = middlewares.readTalker();
  return res.status(HTTP_OK_STATUS).json(talker);
});

routeTalker.get('/:id', (req, res) => {
  const { id } = req.params;
  const talkerById = middlewares.readTalker()
    .find((element) => Number(element.id) === Number(id));
  if (talkerById) {
    return res.status(HTTP_OK_STATUS).json(talkerById);
  }
  return res.status(HTTP_NOT_FOUND_STATUS).json({
    message: 'Pessoa palestrante não encontrada',
  });
});

module.exports = routeTalker;
