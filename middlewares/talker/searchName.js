const rescue = require('express-rescue');
const { lerPalestrantes } = require('../../utils');

module.exports = rescue(async (req, res, _next) => {
  const talkers = await lerPalestrantes();

  const { q } = req.query;

  if (!q) return res.status(200).json(talkers);

  const filteredTalkers = talkers.filter((talker) =>
    talker.name.toLowerCase().includes(q.toLowerCase()));

  res.status(200).send(filteredTalkers);
});
