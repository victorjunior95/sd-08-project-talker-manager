const fs = require('fs');

const nomeDoArquivo = 'talker.json';

const addTalker = (obj) => {
  const data = JSON.parse(fs.readFileSync(nomeDoArquivo));
  data.push(obj);
  return JSON.stringify(data);
};

module.exports = addTalker;