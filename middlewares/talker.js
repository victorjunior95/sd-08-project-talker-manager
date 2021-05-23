const fs = require('fs/promises');

const arquivo = 'talker.json';

module.exports = (req, res) => fs.readFile(arquivo, 'utf8')
    .then((response) => res.status(200).json(JSON.parse(response)))
    .catch(() => res.status(200).json([]));
