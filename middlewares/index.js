const { lerJson, escreverJson } = require('./fs-utils');
const checkAge = require('./checkAge');
const checkName = require('./checkName');
const checToken = require('./checkToken');
const checkData = require('./checkData');
const checkRate = require('./checkRate');
const checkTalk = require('./checkTalk');
const cadastra = require('./cadastra');
const atualizar = require('./atualizar');
const deletar = require('./deletar');
const pesquisa = require('./pesquisa');

module.exports = {
  lerJson,
  escreverJson,
  checkAge,
  checkName,
  checToken,
  checkData,
  checkRate,
  checkTalk,
  cadastra,
  atualizar,
  deletar,
  pesquisa,
};
