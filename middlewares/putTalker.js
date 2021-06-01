const fs = require('fs');

const putTalker = (req, res, _next) => {
  const { id } = req.params;
  const editedTalker = req.body;
  editedTalker.id = parseInt(id);

  const talkers = JSON.parse(fs.readFileSync('./talker.json', 'utf8'));
  const talkerIndex = talkers.findIndex((talker) => talker.id === parseInt(id));

  talkers[talkerIndex] = editedTalker;
  fs.writeFileSync('./talker.json', JSON.stringify(talkers));

  return res.status(201).json(editedTalker);
};

module.exports = putTalker;
