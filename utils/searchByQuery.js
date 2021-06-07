const fs = require('fs').promises;

const filePath = './talker.json';

async function searchByQuery(search) {
  const response = await fs.readFile(filePath, 'utf-8');
  const data = JSON.parse(response);
  if (!search) {
    return data;
  }
  const result = data.filter((talker) => talker.name.includes(search));
  return result;
}

module.exports = searchByQuery;
