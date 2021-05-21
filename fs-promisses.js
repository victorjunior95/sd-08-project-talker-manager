const fs = require('fs');

const talkerJson = './talker.json';

const getTalkerJson = () => new Promise((resolve, reject) => {
  fs.readFile(talkerJson, 'utf8', (err, data) => {
    if (err) {
     reject(new Error('deu erro'));
    }
    resolve(JSON.parse(data));
  });
});

module.exports = getTalkerJson;
