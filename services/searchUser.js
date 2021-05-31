const fs = require('fs');

module.exports = (req, res) => {
  const { q } = req.query;
  const data = JSON.parse(fs.readFileSync('talker.json', 'utf-8'));
  if (!q) return res.status(200).json(data);

  const dataFiltered = data.filter((item) => item.name.includes(q));
  res.status(200).json(dataFiltered);
};
