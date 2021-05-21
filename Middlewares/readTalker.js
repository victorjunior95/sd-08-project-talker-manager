const fs = require('fs');

const readfile = () => new Promise((resolve, reject) => {
  fs.readFile('talker.json', (err, content) => {
    if (err) reject(err);
    resolve(JSON.parse(content));
  });
});

module.exports = (_req, res) => {
  readfile()
  .then((data) => res.status(200).json(data))
  .catch((err) => console.log(err.message));
};
