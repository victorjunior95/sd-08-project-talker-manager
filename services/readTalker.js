const fs = require('fs');

const arquivo = 'talker.json';

const readTalker = () => fs.readFileSync(arquivo, 'utf-8');

module.exports = readTalker;
