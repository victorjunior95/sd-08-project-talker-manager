const fs = require('fs');

const nomeDoArquivo = 'talker.json';

const removeTalker = (id) => {
  const file = JSON.parse(fs.readFileSync(nomeDoArquivo));
  const newArray = file.filter((item) => item.id !== id);
  return JSON.stringify(newArray);
};

module.exports = removeTalker;