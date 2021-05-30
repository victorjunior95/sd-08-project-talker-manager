const fs = require('fs');

const talker = './talker.json';

const setFsTalker = (text) => new Promise((resolve, reject) => {
  fs.writeFile(talker, text, 'utf8', (err) => {
    if (err) {
      reject(new Error('Não pode escrever'));
    }
    resolve(console.log('foi escrito'));
  });
});

  module.exports = setFsTalker;
