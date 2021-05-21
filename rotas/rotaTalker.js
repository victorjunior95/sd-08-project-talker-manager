const express = require('express');
const rescue = require('express-rescue');
const middlewares = require('../middlewares');

const rotaTalker = express.Router();

const HTTP_OK_STATUS = 200;
const NAO_ENCONTRADO = 404;

rotaTalker.get('/', rescue(async (_req, res) => {
  const talker = await middlewares.lerJson();
  res.status(HTTP_OK_STATUS).json(talker);
}));

rotaTalker.get('/:id', rescue(async (req, res) => {
  const talker = await middlewares.lerJson();
  const { id } = req.params;
  const result = talker.find((pessoa) => pessoa.id === Number(id));

  if (!result) {
    return res.status(NAO_ENCONTRADO)
    .send({ message: 'Pessoa palestrante não encontrada' });
  }
  res.status(HTTP_OK_STATUS).json(result);
}));

module.exports = rotaTalker;
