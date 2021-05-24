const fs = require('fs');

module.exports = (req, res) => {
  const talkers = JSON.parse(fs.readFileSync('./talker.json', 'utf8'));
  res.status(200).json(talkers);
};
