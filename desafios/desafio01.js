const fs = require('fs').promises;
// Vi o path nos testes da pasta tests//
const path = require('path');

const talkersJSON = path.join(__dirname, '..', 'talker.json');
// Visto até a linha 5 e aproveitei para olhar a documentação//
const desafio01 = () => fs.readFile(talkersJSON, 'utf-8')
  .then((data) => JSON.parse(data))
  .catch((err) => {
    console.error('erro', err);
  });

module.exports = desafio01;
