const fs = require('fs').promises;

function getRegisteredSpeakers() {
  return fs.readFile('./talker.json', 'utf8')
  .then((fileContent) => JSON.parse(fileContent));
}

function setRegisteredSpeakers(newSpeaker) {
  return fs.writeFile('./talker.json', JSON.stringify(newSpeaker));
}

module.exports = { getRegisteredSpeakers, setRegisteredSpeakers };
