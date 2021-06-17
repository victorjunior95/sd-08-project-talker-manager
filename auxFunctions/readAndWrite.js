const { readFileSync } = require('fs');
const { writeFile } = require('fs').promises;

const readFile = () => {
  try {
    const talkersArr = readFileSync('./talker.json', 'utf8');
    const jsonTalkersArr = JSON.parse(talkersArr);
    return jsonTalkersArr;
  } catch (err) {
    return err;
  }
};

const writeIntoFile = async (fileName, content) => writeFile(fileName, JSON.stringify(content));

module.exports = {
  readFile,
  writeIntoFile,
};