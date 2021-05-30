const path = require('path');

const fs = require('fs').promises;

const fileTalkers = path.resolve(__dirname, '../..', 'talker.json');

const readDataTalkers = () => fs
.readFile(fileTalkers, 'utf-8')
.then((content) => JSON.parse(content));

module.exports = { readDataTalkers };