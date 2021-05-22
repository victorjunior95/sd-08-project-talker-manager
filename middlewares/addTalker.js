const fs = require('fs').promises;

module.exports = async (req, res, _next) => {
  const bodyMessage = req.body;
  const data = await fs.readFile('./talker.json');
  const prevTalkers = JSON.parse(data);
  const newTalker = { id: (prevTalkers.length + 1), ...bodyMessage };
  const talkers = [...prevTalkers, newTalker];

  await fs.writeFile('./talker.json', JSON.stringify(talkers));

  res.status(201).json(newTalker);
};
