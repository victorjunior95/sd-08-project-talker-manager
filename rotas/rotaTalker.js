const express = require('express');
const rescue = require('express-rescue');
const {
  lerJson,
  checkAge,
  checkName,
  checToken,
  checkData,
  checkRate,
  checkTalk,
  cadastra,
  atualizar,
  deletar,
} = require('../middlewares');

const rotaTalker = express.Router();

const HTTP_OK_STATUS = 200;
const NAO_ENCONTRADO = 404;

rotaTalker.get('/', rescue(async (_req, res) => {
  const talker = await lerJson();
  res.status(HTTP_OK_STATUS).json(talker);
}));

rotaTalker.get('/:id', rescue(async (req, res) => {
  const talker = await lerJson();
  const { id } = req.params;
  const result = talker.find((pessoa) => pessoa.id === Number(id));

  if (!result) {
    return res.status(NAO_ENCONTRADO)
    .send({ message: 'Pessoa palestrante não encontrada' });
  }
  return res.status(HTTP_OK_STATUS).json(result);
}));

rotaTalker.post('/',
  checToken,
  checkName,
  checkAge,
  checkTalk,
  checkData,
  checkRate,
  cadastra);

rotaTalker.put('/:id',
  checToken,
  checkName,
  checkAge,
  checkTalk,
  checkData,
  checkRate,
  atualizar);

rotaTalker.delete('/:id',
  checToken,
  deletar);

module.exports = rotaTalker;
