const fs = require('fs').promises;

const getTalkersData = async (req, res) => {
  const data = await fs.readFile('./talker.json', 'utf8');
  res.status(200).json(JSON.parse(data));
};

module.exports = getTalkersData;
