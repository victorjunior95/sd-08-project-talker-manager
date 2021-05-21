const fs = require('fs/promises');

module.exports = async (_req, res, _next) => {
  const data = await fs.readFile('./talker.json');

  const talkers = (data) ? JSON.parse(data) : [];

  res.status(200).json(talkers);
};
