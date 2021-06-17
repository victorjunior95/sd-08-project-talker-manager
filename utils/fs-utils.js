const fs = require('fs/promises');

function getData() {
  return fs.readFile('talker.json', 'utf8')
      .then((dataJSON) => JSON.parse(dataJSON))
      .catch((err) => console.log(err));
}

module.exports = {
  getData,
};
