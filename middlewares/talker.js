const fs = require('fs');

const db = 'talker.json';

const talker = (_req, res) => res.status(200).json(JSON.parse(fs.readFileSync(db, 'utf-8')));

module.exports = talker;
