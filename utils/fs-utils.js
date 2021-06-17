const fs = require('fs');

function getData() {
  return JSON.parse(fs.readFileSync('talker.json', 'utf8'));
}

module.exports = {
  getData,
};
