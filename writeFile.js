const fs = require('fs');
const readFile = require('./readFile');

const writeFile = async (fileName, arquivo) => {
  const data = await readFile(fileName);
  const id = data.length + 1;
  const newTalker = { ...arquivo, id };
  try {
    await fs.promises.writeFile(fileName, JSON.stringify([...data, newTalker]));
    return newTalker;
  } catch (err) {
    console.error(`Erro ao escrever o arquivo: ${err.message}`);
  }
};

module.exports = writeFile;
