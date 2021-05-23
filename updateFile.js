const fs = require('fs');

const writeFile = async (fileName, arquivo, id) => {
  try {
    await fs.promises.writeFile(fileName, JSON.stringify(arquivo));
    return arquivo.find((talker) => talker.id === id);
  } catch (err) {
    console.error(`Erro ao escrever o arquivo: ${err.message}`);
  }
};

module.exports = writeFile;
