const fs = require('fs').promises;
const path = require('path');

const fileTalkers = path.resolve(__dirname, '../../', 'talker.json');

const writeFileTalker = async (content) => {
  try {
    const newJSON = await JSON.stringify(content);
    fs.writeFile(fileTalkers, newJSON, 'utf-8');
  } catch (err) {
    console.log(`Erro ao escrever no arquivo JSON${err}`);
  }
};

module.exports = writeFileTalker;
