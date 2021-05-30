const retornaPalestrantes = require('./retornaPalestrantes');
const retornaUmPalestrante = require('./retornaUmPalestrante');
const validaLogin = require('./validaLogin');
const adicionaUmPalestrante = require('./adicionaUmPalestrante');
const validaTokenAutenticacao = require('./validaTokenAutenticacao');
const validaNome = require('./validaNome');
const validaIdade = require('./validaIdade');
const verificaNota = require('./verificaNota');
const validaData = require('./validaData');
const verificaTalk = require('./verificaTalk');
const editaUmPalestrante = require('./editaUmPalestrante');

module.exports = {
  retornaPalestrantes,
  retornaUmPalestrante,
  validaLogin,
  adicionaUmPalestrante,
  validaTokenAutenticacao,
  validaNome,
  validaIdade,
  verificaNota,
  validaData,
  verificaTalk,
  editaUmPalestrante,
};
