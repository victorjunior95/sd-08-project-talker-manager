const fs = require('fs');

const read = require('./readTalker');

const talker = JSON.parse(read());

const deleteTalker = (id) => {
  const withoutId = talker.filter((item) => item.id !== id);

  fs.writeFileSync(`${__dirname}/../talker.json`, JSON.stringify(withoutId));
};

module.exports = deleteTalker;
