const fs = require('fs').promises;

function getRegisteredSpeakers() {
  return fs.readFile('./talker.json', 'utf8')
  .then((fileContent) => JSON.parse(fileContent));
}

function setRegisteredSpeakers(newTalker) {
  return fs.writeFile('./talker.json', JSON.stringify(newTalker));
}

module.exports = { getRegisteredSpeakers, setRegisteredSpeakers };
