const fs = require('fs');

function getAllTalkers() {
  return JSON.parse(fs.readFileSync('talker.json', 'utf-8'));
}

module.exports = { getAllTalkers };