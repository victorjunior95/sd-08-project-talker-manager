const fs = require('fs');

const fsTalker = (file) => new Promise((resolve, reject) => {
    fs.readFile(file, 'utf8', (err, data) => {
      if (err) {
        reject(new Error('Erro ao ler arquivo'));
      }
       resolve(JSON.parse(data));
    });
  });

const fsAdd = (content) => new Promise((resolve, reject) => {
  fs.writeFile('./talker.json', content, 'utf8', (err) => {
    if (err) {
      reject(new Error('Erro ao adicionar ao arquivo'));
    }
    resolve(console.log('Deu tudo certo'));
  });
});

module.exports = {
  fsTalker, fsAdd,
};
