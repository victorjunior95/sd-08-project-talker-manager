const readSync = require('./helpers/readSync');

function challengeOne(_req, res) {
  res.status(200).send(readSync('./talker.json'));
}

module.exports = challengeOne;
