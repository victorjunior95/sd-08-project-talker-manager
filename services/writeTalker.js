const fs = require('fs').promises;

const DIR = './talker.json';

module.exports = (talker) => {
    const jsonTalk = JSON.stringify(talker);
    const writeTalk = fs.writeFile(DIR, jsonTalk);
    return writeTalk;
};