const fs = require('fs');

const dbTalker = fs.readFileSync('talker.json', 'utf8'); 

const talkerMiddleware = (_req, res) => 
(dbTalker.length === 0 
  ? res.status(200).send(JSON.parse([])) : res.status(200).send(JSON.parse(dbTalker)));

module.exports = talkerMiddleware;