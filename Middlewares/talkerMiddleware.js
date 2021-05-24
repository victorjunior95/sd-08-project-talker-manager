const fs = require('fs');

const talkerMiddleware = (_req, res) => {
  const dbTalker = fs.readFile('talker.json', 'utf8');

  return res.status(200).json(JSON.parse(dbTalker));
};

module.exports = talkerMiddleware;