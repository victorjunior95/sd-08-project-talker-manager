const fs = require('fs');

const arquivo = fs.readFileSync('talker.json', 'utf8');
module.exports = () => JSON.parse(arquivo);