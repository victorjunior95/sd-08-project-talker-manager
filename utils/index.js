const path = require('path');

const fs = require('fs').promises;

const fileTalkers = path.resolve(__dirname, '..', 'talker.json');

const getTalkers = () => fs
.readFile(fileTalkers, 'utf-8')
.then((content) => JSON.parse(content));

module.exports = { getTalkers };