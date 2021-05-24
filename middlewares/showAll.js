const talkers = require('../talker.json');

module.exports = (req, res) => {
  res.status(200).json(talkers);
};
