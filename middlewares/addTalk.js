const fs = require('fs');

module.exports = (req, res) => {
  const talker = JSON.parse(fs.readFileSync('./talker.json'));
  const newTalker = { id: talker.length + 1, ...req.body };
  fs.writeFileSync('./talker.json', JSON.stringify([...talker, newTalker]));
  res.status(201).json(newTalker);
};
