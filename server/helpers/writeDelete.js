const fs = require('fs').promises;

function writeDelete(caminho, objeto) {
return fs.writeFile(caminho, objeto, { flag: 'w' })
  .then(() => true)
  .catch((err) => `Erro ao escrever o arquivo: ${err.message}`);
}

module.exports = writeDelete;