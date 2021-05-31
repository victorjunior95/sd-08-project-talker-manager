const fs = require('fs');

const read = require('./readTalker');

const talker = JSON.parse(read());

const editTalker = (id, obj) => {
  const withoutId = talker.filter((item) => item.id !== id);

  const newList = [...withoutId, obj].sort((a, b) => a.id - b.id);

  fs.writeFileSync(`${__dirname}/../talker.json`, JSON.stringify(newList));
};

module.exports = editTalker;
