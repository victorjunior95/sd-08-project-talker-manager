const fs = require('fs/promises');

module.exports = async (req, res, _next) => {
  const { query } = req;

  const data = await fs.readFile('./talker.json');
  const talkers = JSON.parse(data);

  if (!query.q || query === '') return res.status(200).json(talkers);

  const response = talkers.filter((talker) => talker.name.includes(query.q));

  res.status(200).json(response);
};
