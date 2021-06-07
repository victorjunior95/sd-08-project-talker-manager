const fs = require('fs');

const getSearch = (req, res, next) => {
  const { q } = req.query;

  if (!q) {
    return next();
  }

  const talkers = JSON.parse(fs.readFileSync('./talker.json', 'utf8'));
  const filtredTalkers = talkers.filter((talker) => talker.name.includes(q));
  res.status(200).json(filtredTalkers);
};

module.exports = getSearch;
