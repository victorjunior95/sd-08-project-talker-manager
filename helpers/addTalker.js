const fs = require('fs');

const nomeDoArquivo = 'talker.json';

const addTalker = (obj) => {
  const data = fs.readFileSync(nomeDoArquivo);
  return data.push(obj);
};

module.exports = addTalker;