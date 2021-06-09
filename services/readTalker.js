const fs = require('fs').promises;

const DIR = './talker.json';

module.exports = () => fs.readFile(DIR, 'utf-8')
    .then((data) => JSON.parse(data));
