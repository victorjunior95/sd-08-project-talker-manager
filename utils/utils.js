const fs = require('fs/promises');

async function getTalker() {
  const response = await fs.readFile('./talker.json', 'utf-8');

  return JSON.parse(response);
}

// getTalker().then((data) => console.log(data));

module.exports = { getTalker };
