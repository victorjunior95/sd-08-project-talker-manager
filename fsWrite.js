const fs = require('fs/promises');

const talker = './talker.json';

const setFsTalker = (text) => fs.writeFile(talker, text)
  .then(() => {
    console.log('Arquivo escrito com sucesso!');
  })
  .catch((err) => {
    console.error(`Erro ao escrever o arquivo: ${err.message}`);
  });

  module.exports = setFsTalker;
