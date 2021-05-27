const buscarPalestrantes = require('./BuscarPalestrantes');
const buscarPorId = require('./BuscarPorId');
const verificarLogin = require('./VerificarLogin.js');
const verificarToken = require('./VerificarToken.js');
const verificarNome = require('./VerificarNome.js');
const verificarIdade = require('./VerificarIdade.js');
const verificarCampoTalk = require('./VerificarCampoTalk.js');
const verificarDadosTalk = require('./VerificarDadosTalk.js');
const adicionarPalestrante = require('./AdicionarPalestrante.js');
const editarPalestrante = require('./EditarPalestrante.js');

module.exports = {
  buscarPalestrantes,
  buscarPorId,
  verificarLogin,
  verificarToken,
  verificarNome,
  verificarIdade,
  verificarCampoTalk,
  verificarDadosTalk,
  adicionarPalestrante,
  editarPalestrante,
};
