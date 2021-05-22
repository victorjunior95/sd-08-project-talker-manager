const fs = require('fs').promises;
const path = require('path');

const TALKER_FILE_PATH = path.resolve(__dirname, '..', 'talker.json');

const getTalkers = () => fs
  .readFile(TALKER_FILE_PATH, 'utf-8')
  .then((content) => JSON.parse(content));

const setTalkers = (newTalkers) => fs
  .writeFile(TALKER_FILE_PATH, JSON.stringify(newTalkers, null, 0));

module.exports = {
  getTalkers,
  setTalkers,
};
