const fs = require('fs');

function challengeOne(_req, res) {
  res.status(200).send(fs.readFileSync('./talker.json'));
}

module.exports = challengeOne;
