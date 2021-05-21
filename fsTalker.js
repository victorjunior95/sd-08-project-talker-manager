const fs = require('fs');

const fsTalker = (file) => new Promise((resolve, reject) => {
    fs.readFile(file, 'utf8', (err, data) => {
      if (err) {
        reject(new Error('Erro ao ler arquivo'));
      }
       resolve(JSON.parse(data));
    });
  });

module.exports = fsTalker;
