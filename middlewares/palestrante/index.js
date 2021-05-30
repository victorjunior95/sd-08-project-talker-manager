const verificaToken = require('./verificaToken.js');
const verificaNome = require('./verificaNome.js');
const verificaIdade = require('./verificaIdade.js');
const verificaCampo = require('./verificaCampo.js');
const verificaDados = require('./verificaDados.js');
const adicionaPalestrante = require('./adicionaPalestrante.js');

module.exports = {
  adicionaPalestrante,
  verificaToken,
  verificaNome,
  verificaIdade,
  verificaCampo,
  verificaDados,
};
