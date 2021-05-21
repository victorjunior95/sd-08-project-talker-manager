const fs = require('fs').promises;

function lerJson() {
  return fs.readFile('./talker.json', 'utf-8')
    .then((date) => JSON.parse(date));
}

function escreverJson(escrever) {
  return fs.writeFile('./talker.json', JSON.stringify(escrever));
}

module.exports = {
  lerJson,
  escreverJson,
};
