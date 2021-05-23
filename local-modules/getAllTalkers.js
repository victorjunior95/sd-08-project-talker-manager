const fs = require('fs/promises');

const getAllTalkers = (_req, res) => {
  fs.readFile('talker.json')
    .then((raw) => JSON.parse(raw))
    .then((data) => res.send(data))
    .catch((err) => console.error(err));
};

module.exports = getAllTalkers;
