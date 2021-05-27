const fs = require('fs').promises;
const readFile = require('./readFile');

function editPerson(caminho, objeto, id) {
const newObjeto = objeto;
const read = JSON.parse(readFile(caminho));
newObjeto.id = id;
read.push(newObjeto);
const final = JSON.stringify(read);
return fs.writeFile(caminho, final)
  .then(() => newObjeto)
  .catch((err) => `Erro ao escrever o arquivo: ${err.message}`);
}

module.exports = editPerson;
