const fs = require('fs');

module.exports = () => JSON.parse(fs.readFileSync('./talker.json', 'utf-8'));