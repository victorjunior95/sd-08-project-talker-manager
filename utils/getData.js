const fs = require('fs');

module.exports = async (file) => {
  const data = await fs.promises.readFile(file, 'utf-8');
  const dataJSON = await JSON.parse(data);
  return dataJSON;
};
