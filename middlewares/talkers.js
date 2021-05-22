const talkers = require('../talker.json');

module.exports = (req, res) => {
  if (talkers.length === 0) return res.status(200).json([]);
  res.status(200).json(talkers);
};
