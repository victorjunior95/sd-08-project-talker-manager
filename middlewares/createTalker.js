const fs = require('fs');

module.exports = (req, res) => {
  const talkers = JSON.parse(fs.readFileSync('./talker.json', 'utf8'));
  const newTalker = req.body;
  talkers.push({
    ...newTalker,
    id: talkers.length + 1,
  });
  fs.writeFileSync('./talker.json', JSON.stringify(talkers));
  res.status(201).json(talkers[talkers.length - 1]);
};
