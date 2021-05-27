const fs = require('fs/promises');
const readFile = require('./readFile');

function writePerson(caminho, objeto) {
const newObjeto = objeto;
const read = JSON.parse(readFile(caminho));
newObjeto.id = read.length + 1;
read.push(newObjeto);
const final = JSON.stringify(read);
return fs.writeFile(caminho, final)
  .then(() => newObjeto)
  .catch((err) => `Erro ao escrever o arquivo: ${err.message}`);
}

module.exports = writePerson;