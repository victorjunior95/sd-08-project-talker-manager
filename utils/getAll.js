const fs = require('fs').promises;

const filePath = './talker.json';

async function getTalker() {
  const response = await fs.readFile(filePath, 'utf-8');
  const data = await JSON.parse(response);
  return data;
}

// getTalker().then((data) => console.log(data));

module.exports = getTalker;
