const fs = require('fs').promises;
// Vi o path nos testes da pasta tests//
const path = require('path');

const talkersJSON = path.join(__dirname, '..', 'talker.json');
// Visto até a linha 5 e aproveitei para olhar a documentação//
const desafio02 = (id) => fs.readFile(talkersJSON, 'utf-8')
  .then((data) => JSON.parse(data).find((user) => user.id === id))
  .catch((err) => console.error('error', err));

module.exports = desafio02;
