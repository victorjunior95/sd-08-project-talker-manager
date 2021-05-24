const fs = require('fs');

module.exports = (req, res, next) => {
  const talkers = JSON.parse(fs.readFileSync('./talker.json', 'utf8'));
  const search = req.query.q;
  const newArr = talkers.filter(({ name }) => name.includes(search));
  if (newArr.length === 0) return next();
  fs.writeFileSync('./talker.json', JSON.stringify(newArr));
  res.status(200).json(newArr);
};
