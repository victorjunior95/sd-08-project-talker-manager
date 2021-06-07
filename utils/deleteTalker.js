const fs = require('fs').promises;

const filePath = './talker.json';

async function deleteTalker(id) {
  const response = await fs.readFile(filePath, 'utf-8');
  const data = JSON.parse(response);
  const filteredTalkers = data.filter((talker) => talker.id !== id);
  await fs.writeFile(filePath, JSON.stringify(filteredTalkers));
}

module.exports = deleteTalker;
