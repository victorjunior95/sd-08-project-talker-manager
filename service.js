const fs = require('fs').promises;

module.exports = async () => {
  const data = await fs.readFile('./talker.json', 'utf-8');
  const dataJSON = await JSON.parse(data);
  return dataJSON;
};
