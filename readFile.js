const fs = require('fs');

const readFile = async (fileName) => {
  try {
    const response = await fs.promises.readFile(fileName, 'utf8');
    const data = await JSON.parse(response);
    return data;
  } catch (err) {
    console.error(`Não foi possível ler o arquivo ${fileName}\n Erro: ${err}`);
    process.exit(1);
  }
};

module.exports = readFile;
