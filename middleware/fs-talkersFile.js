const fs = require('fs').promises;

const getTalker = () => (
  fs.readFile('./talker.json', 'utf-8')
    .then((fileContent) => JSON.parse(fileContent))
);

const setTalker = (newTalker) => (
  fs.writeFile('./talker.json', JSON.stringify(newTalker), 'utf-8')
);

module.exports = { getTalker, setTalker };