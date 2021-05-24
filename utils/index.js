const fs = require('fs').promises;
const path = require('path');
// Com ajuda do mestre Paulo
const talkers = path.resolve(__dirname, '..', './talker.json');

const lerPalestrantes = () => fs.readFile(talkers, 'utf-8').then((content) => JSON.parse(content));

const inserirPalestrantes = async (newTalkers) => {
  await fs.writeFile(talkers, JSON.stringify(newTalkers, null, 2));
};

module.exports = {
  lerPalestrantes, 
  inserirPalestrantes,
};
