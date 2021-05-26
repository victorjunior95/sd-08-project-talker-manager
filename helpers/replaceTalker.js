const fs = require('fs');

const nomeDoArquivo = 'talker.json';

const addTalker = (obj) => {
  const data = JSON.parse(fs.readFileSync(nomeDoArquivo));
  data.remove((item) => item.id === obj.id).push(obj);
  return JSON.stringify(data);
};

module.exports = addTalker;