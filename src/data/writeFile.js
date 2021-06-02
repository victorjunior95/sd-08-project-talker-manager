const fs = require('fs').promises;

const path = require('path');

const pathTalkerJson = path.resolve(__dirname, '../../', 'talker.json');

const writeFileTalkers = async (content) => {
  try {
    const contente = await JSON.stringify(content);
    await fs.writeFile(pathTalkerJson, contente, 'utf-8');
  } catch (err) {
    console.log(`Erro ao escrever no arquivo Talker.Json ${err}`);
    return err;
  }
};

module.exports = writeFileTalkers;

// Promises com fs
// https://nodejs.org/dist/latest-v10.x/docs/api/fs.html#fs_fs_promises_api

// Recurso Path
// https://www.digitalocean.com/community/tutorials/nodejs-how-to-use__dirname

// Usando o Método Resolve
// https://nodejs.org/api/path.html
