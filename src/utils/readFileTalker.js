const path = require('path');
const fs = require('fs').promises;

const fileTalkers = path.resolve(__dirname, '../../', 'talker.json');

const readFileTalkers = async () => {
  try {
    const response = await fs.readFile(fileTalkers, 'utf-8');
    const content = JSON.parse(response);
    return content;
  } catch (err) {
    console.log(err, 'Problema com a leitura do arquivo Json: ');
  }
};

module.exports = readFileTalkers;
