const fs = require('fs');

const postTalker = (req, res, _next) => {
  const talkers = JSON.parse(fs.readFileSync('./talker.json', 'utf8'));

  const newTalker = req.body;
  newTalker.id = talkers[talkers.length - 1].id + 1;

  talkers.push(newTalker);
  fs.writeFileSync('./talker.json', JSON.stringify(talkers));

  return res.status(201).json(newTalker);
};

module.exports = postTalker;
