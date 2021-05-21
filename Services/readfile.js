const fs = require('fs');

module.exports = () => new Promise((resolve, reject) => {
  fs.readFile('talker.json', (err, content) => {
    if (err) reject(err);
    resolve(JSON.parse(content));
  });
});