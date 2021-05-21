const fs = require('fs');

function readTalker() {
  try {
    const data = fs.readFileSync('./talker.json');
    return JSON.parse(data);
  } catch (error) {
    return error;
  }
}

function writeTalker(write) {
  return fs.writeFileSync('./talker.json', JSON.stringify(write));
}

module.exports = {
  readTalker,
  writeTalker,
};