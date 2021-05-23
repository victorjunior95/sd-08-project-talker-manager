const rescue = require('express-rescue');
const { getTalkers } = require('../../utils/fsTalker');

module.exports = rescue(async (req, res) => {
  const { q } = req.query;

  const talkers = await getTalkers();

  if (!q) return res.status(200).json(talkers);

  const filteredTalkers = talkers.filter(({ name }) => name.includes(q));
  
  res.status(200).json(filteredTalkers);
});
