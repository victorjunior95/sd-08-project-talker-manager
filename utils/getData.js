const fs = require('fs/promises');

module.exports = async (file) => {
  const data = await fs.readFile(file, 'utf-8');
  const dataJSON = await JSON.parse(data);
  return dataJSON;
};
