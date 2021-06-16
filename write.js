const fs = require('fs').promises;

function postTalker(newTalker) {
  return fs.writeFile('./talker.json', JSON.stringify(newTalker));
}

module.exports = { postTalker };
