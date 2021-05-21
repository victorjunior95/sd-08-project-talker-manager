const fs = require('fs');

module.exports = (filepath) => new Promise((resolve, reject) => {
  fs.readFile(filepath, 'utf-8', (err, data) => {
    if (err) reject(new Error('Erro ao ler conteúdo do arquivo.'));
    resolve(JSON.parse(data));
  });
});
