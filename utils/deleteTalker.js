const fs = require('fs').promises;

const filePath = './talkers.json';

async function deleteTalker(id) {
  const response = await JSON.parse(fs.readFile(filePath, 'utf-8'));
  const filteredTalkers = response.filter((talker) => talker.id !== id);
  await fs.writeFile(filePath, JSON.stringify(filteredTalkers));
}

module.exports = deleteTalker;
