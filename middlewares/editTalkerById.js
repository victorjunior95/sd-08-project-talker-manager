const fs = require('fs').promises;

module.exports = async (req, res, _next) => {
  const id = Number(req.params.id);
  const bodyMessage = req.body;
  const toUpdate = { id, ...bodyMessage };
  const data = await fs.readFile('./talker.json');
  const talkers = JSON.parse(data);
  const talkerIndex = talkers.findIndex((t) => t.id === id);
  talkers.splice(talkerIndex, 1, toUpdate);
  await fs.writeFile('./talker.json', JSON.stringify(talkers));

  res.status(200).json(toUpdate);
};
