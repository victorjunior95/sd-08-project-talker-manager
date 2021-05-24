const rescue = require('express-rescue');
const { lerPalestrantes } = require('../../utils');

module.exports = rescue(async (_req, res, _next) => {
  const talkers = await lerPalestrantes();
  res.status(200).json(talkers);
});
