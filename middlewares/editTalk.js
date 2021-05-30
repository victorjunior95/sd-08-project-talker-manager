const fs = require('fs');

module.exports = (req, res) => {
  const { id } = req.params;
  const talker = JSON.parse(fs.readFileSync('./talker.json'));
  const index = talker.indexOf(talker.find((data) => data.id === id));
  const newTalker = { id: parseInt(id, 10), ...req.body };
  talker.splice(index, 1, newTalker);
  fs.writeFileSync('./talker.json', JSON.stringify(talker));
  res.status(200).json(newTalker);
};
