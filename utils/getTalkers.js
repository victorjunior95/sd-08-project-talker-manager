const fs = require('fs/promises');

module.exports = async (fileName) => fs.readFile(fileName, 'utf8')
    .then((fileContent) => JSON.parse(fileContent))
    .catch((err) => `Não foi possível ler o arquivo: ${err.message}`);