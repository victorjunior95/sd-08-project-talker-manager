const fs = require('fs');

const arquivo = async () => JSON.parse(fs.readFileSync('./talker.json', 'utf8'));

module.exports = arquivo;
