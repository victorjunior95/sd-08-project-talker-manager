const fs = require('fs');

const getTalkerById = (req, res, _) => {
  const id = req.params.id;

  const talkers = JSON.parse(fs.readFileSync('./talker.json', 'utf8'));
  const talker = talkers.find((currentTalker) => Number(currentTalker.id) === Number(id));

  if (talker) {
    return res.status(200).json(talker);
  }

  return res.status(404).json({ message: 'Pessoa palestrante não encontrada' })
};

module.exports = getTalkerById;
