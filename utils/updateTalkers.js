const fs = require('fs');

module.exports = (talkers) => {
  fs.writeFileSync('talker.json', JSON.stringify(talkers));
};