const fs = require('fs');

const getAllTalkers = (_req, res, _next) => {
  const rawdata = fs.readFileSync('talker.json');
  const talkers = JSON.parse(rawdata);
  if (!talkers.length) {
    return res.status(200).json([]);
  }
  res.status(200).json(talkers);
};

module.exports = getAllTalkers;