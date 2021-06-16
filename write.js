const fs = require('fs').promises;

module.exports = async (newTalker) => {
  await fs.writeFile('./talker.json', JSON.stringify(newTalker));
};
