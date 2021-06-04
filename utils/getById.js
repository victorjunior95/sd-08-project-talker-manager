const fs = require('fs').promises;

const filePath = './talker.json';

async function getById(id) {
  const response = await fs.readFile(filePath, 'utf-8');
  const data = JSON.parse(response);
  const talker = data.find((tlk) => tlk.id === id);
  if (!talker) {
    return null;
  }
  return talker;
}

module.exports = getById;
