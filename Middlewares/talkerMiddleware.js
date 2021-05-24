const fs = require('fs');

const dbTalker = fs.readFileSync('./talker.json', 'utf8'); 

const talkerMiddleware = (_req, res) => 
res.status(200).json(JSON.parse(dbTalker));

module.exports = talkerMiddleware;