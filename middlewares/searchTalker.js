const fs = require('fs');

const searchTalker = (req, res, _next) => {
  const rawdata = fs.readFileSync('talker.json');
  const talkers = JSON.parse(rawdata);
  const query = req.query.q;
  if (!query) return res.status(200).json(talkers);
  const filtered = talkers.filter((t) => t.name.includes(query));
  return res.status(200).json(filtered);
};
module.exports = searchTalker;