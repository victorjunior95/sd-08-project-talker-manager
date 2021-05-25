const fs = require('fs');

const nomeDoArquivo = 'talker.json';

const addTalker = (obj) => {
  const data = JSON.parse(fs.readFileSync(nomeDoArquivo));
  return JSON.stringify(data.push(obj));
};

module.exports = addTalker;