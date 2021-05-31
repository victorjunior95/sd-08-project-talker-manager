const fs = require('fs').promises;

module.exports = async (talkers, talker) => {
  talkers.push(talker);
  
  await fs.writeFile('./talker.json', JSON.stringify(talkers));
};