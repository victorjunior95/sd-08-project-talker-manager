const fs = require('fs');

const talker = './talker.json';

const getFsTalker = () => new Promise((resolve, reject) => {
  fs.readFile(talker, 'utf8', (err, data) => {
    if (err) {
      reject(new Error('Deu ruim, mim ajuda lusiano'));
    }
    resolve(JSON.parse(data));
  });
});

module.exports = getFsTalker;
