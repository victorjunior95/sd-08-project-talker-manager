const fs = require('fs');

const readFile = () => {
  try {
    const talkersArr = fs.readFileSync('./talker.json', 'utf8');
    const jsonTalkersArr = JSON.parse(talkersArr);
    return jsonTalkersArr;
  } catch (err) {
    return err;
  }
};

module.exports = {
  readFile,
};
