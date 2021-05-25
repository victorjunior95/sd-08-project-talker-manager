const fs = require('fs').promises;

const getTalker = () => (
  fs.readFile('./talker.json', 'utf-8')
    .then((fileContent) => JSON.parse(fileContent))
);

module.exports = { getTalker };