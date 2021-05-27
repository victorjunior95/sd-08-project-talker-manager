const fs = require('fs');

const nomeDoArquivo = 'talker.json';

const replaceTalker = (obj, id) => {
  const file = JSON.parse(fs.readFileSync(nomeDoArquivo));
  const newArray = file.filter((item) => item.id !== id);
  newArray.push(obj);
  return JSON.stringify(newArray);
};

module.exports = replaceTalker;