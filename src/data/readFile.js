const path = require('path');
const fs = require('fs').promises;

const pathTalkerJson = path.resolve(__dirname, '../../', 'talker.json');

const readFileTalkers = async () => {
  try {
    const response = await fs.readFile(pathTalkerJson, 'utf-8');
    const content = JSON.parse(response);
    return content;
  } catch (err) {
    console.log(`Erro ao escrever no arquivo Talker.Json ${err}`);
    return err;
  }
};

module.exports = readFileTalkers;
