const fs = require('fs');

const read = require('./readTalker');

const talker = JSON.parse(read());

const writeFile = (param) => {
  const newTalker = [...talker, param];

  fs.writeFileSync(`${__dirname}/../talker.json`, JSON.stringify(newTalker));
};

module.exports = writeFile;
