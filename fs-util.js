const fs = require('fs');

const getTalker = () => new Promise((resolve, reject) => {
  fs.readFile('./talker.json', 'utf-8', (err, data) => {
    if (err) reject(new Error('Erro ao ler arquivo.'));
    resolve(JSON.parse(data));
  });
});

function setTalker(newTalker) {
  return fs.writeFile('./talker.json', JSON.stringify(newTalker));
}

module.exports = { getTalker, setTalker };