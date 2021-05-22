const fs = require('fs');

const talker = './talker.json';

const setFsTalker = (text) => new Promise((resolve, reject) => {
  fs.writeFile(talker, text, 'utf8', (err) => {
    if (err) {
      reject(new Error('deu ruim'));
    }
    resolve(console.log('Deu bom'));
  });
});

  module.exports = setFsTalker;
