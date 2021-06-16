const path = require('path');
const fs = require('fs').promises;

const pathData = path.resolve(__dirname, '../../', 'talker.json');

const readFiles = async () => {
  const result = await fs.readFile(pathData, 'utf-8');
  const content = JSON.parse(result);
  return content;
};

module.exports = {
  readFiles,
};
