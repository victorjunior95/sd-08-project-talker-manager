const fs = require('fs');

const getTalker = () => new Promise((resolve, reject) => {
  fs.readFile('./talker.json', 'utf-8', (err, data) => {
    if (err) reject(new Error('Erro ao ler arquivo.'));
    resolve(JSON.parse(data));
  });
});

const setTalker = (newTalker) => new Promise((resolve, reject) => {
  fs.writeFile('./talker.json', newTalker, 'utf-8', (err) => {
    if (err) reject(new Error('Erro ao inserir arquivo.'));
    resolve(true);
  });
});

module.exports = { getTalker, setTalker };