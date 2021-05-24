const fs = require('fs').promises;
const path = require('path');

const readTalkers = require('./readFile');

const writeTalkers = async (file) => {
  await fs.writeFile(
    path.join(__dirname, '../talker.json'),
    JSON.stringify(file),
    'utf8',
    (err) => err,
  );
  return readTalkers();
};

module.exports = writeTalkers;