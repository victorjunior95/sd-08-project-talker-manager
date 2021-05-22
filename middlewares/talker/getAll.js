const rescue = require('express-rescue');
const { getTalkers } = require('../../utils/fsTalker');

module.exports = rescue(async (_req, res) => {
  const talkers = await getTalkers();
  res.status(200).json(talkers);
});
