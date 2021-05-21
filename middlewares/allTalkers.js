const fs = require('fs');

const dbFileName = 'talker.json';
module.exports = (_req, res) => {
  const db = fs.readFileSync(dbFileName, 'utf8');
  if (db.length) {
    return res.status(200).send(JSON.parse(db));
  }
  return res.status(200).send(JSON.parse([]));
};
