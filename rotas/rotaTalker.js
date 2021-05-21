const express = require('express');
const rescue = require('express-rescue');
const middlewares = require('../middlewares');

const rotaTalker = express.Router();

const HTTP_OK_STATUS = 200;
const NAO_ENCONTRADO = 404;
const NOME_ERRADO = 400;
const TOKEN_ERRADO = 401;
const DEZESSEIS = 16;
const TRES = 3;

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

rotaTalker.post('/', rescue(async (req, res, _next) => {
  const { authentication } = req.headers;
  const { name } = req.body;

  if (!authentication) return res.status(TOKEN_ERRADO).send({ message: 'Token não encontrado' });
  if (authentication.length !== DEZESSEIS) {
    return res.status(TOKEN_ERRADO)
      .send({ message: 'Token inválido' });
  } 
  if (!name) return res.status(NOME_ERRADO).send({ message: 'O campo "name" é obrigatório' });
  if (name.length < TRES) {
    return res.status(NOME_ERRADO).send({ message: 'O "name" deve ter pelo menos 3 caracteres' });
  }
}));

module.exports = rotaTalker;
