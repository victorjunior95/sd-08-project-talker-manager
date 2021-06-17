const fs = require('fs');

const talkers = () => JSON.parse(fs.readFileSync('talker.json', 'utf-8'));

module.exports = talkers;
