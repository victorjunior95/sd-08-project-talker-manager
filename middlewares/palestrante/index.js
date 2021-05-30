const adicionaPalestrante = require('./adicionaPalestrante');
const deletaPalestrante = require('./deletaPalestrante');
const editaPalestrante = require('./editaPalestrante');
const getAllTalkers = require('./getAllTalkers');
const palestrantePorId = require('./palestrantePorId');
const pesquisaPalestrante = require('./pesquisaPalestrante');
const verificaIdade = require('./verificaIdade');
const verificaNome = require('./verificaNome');
const verificaRate = require('./verificaRate');
const verificaTalk = require('./verificaTalk');
const verificaToken = require('./verificaToken');
const verificaWatchedAt = require('./verificaWatchedAt');

module.exports = {
  adicionaPalestrante,
  deletaPalestrante,
  editaPalestrante,
  getAllTalkers,
  palestrantePorId,
  pesquisaPalestrante,
  verificaIdade,
  verificaNome,
  verificaRate,
  verificaTalk,
  verificaToken,
  verificaWatchedAt,
};
