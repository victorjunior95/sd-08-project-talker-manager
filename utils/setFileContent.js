const fs = require('fs');

module.exports = (filepath, data) => new Promise((resolve, reject) => {
  fs.writeFile(filepath, data, 'utf-8', (err) => {
    if (err) reject(new Error('Erro ao ler conteúdo do arquivo.'));
    resolve(true);
  });
});
