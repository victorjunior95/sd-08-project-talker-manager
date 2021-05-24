const fs = require('fs').promises;
const path = require('path');

const readTalkers = async () => {
  const file = await fs.readFile(
    path.join(__dirname, '../talker.json'),
    'utf8',
    (err, fileData) => {
      if (err) return err;
      return fileData;
    },
  );

  return JSON.parse(file);
};

module.exports = readTalkers;