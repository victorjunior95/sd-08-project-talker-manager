const adicionaPalestrante = require('./adicionaPalestrante.js');
const deletaPalestrante = require('./deletaPalestrante.js');
const editaPalestrante = require('./editaPalestrante.js');
const pesquisaPalestrante = require('./pesquisaPalestrante.js');
const verificaIdade = require('./verificaIdade.js');
const verificaNome = require('./verificaNome.js');
const verificaRate = require('./verificaRate.js');
const verificaTalk = require('./verificaTalk.js');
const verificaToken = require('./verificaToken.js');
const verificaWatchedAt = require('./verificaWatchedAt.js');

module.exports = {
  adicionaPalestrante,
  deletaPalestrante,
  editaPalestrante,
  pesquisaPalestrante,
  verificaIdade,
  verificaNome,
  verificaRate,
  verificaTalk,
  verificaToken,
  verificaWatchedAt,
};
