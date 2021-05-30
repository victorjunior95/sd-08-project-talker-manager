const fs = require('fs');

const getTalkerById = (req, res) => {
  const talkers = JSON.parse(fs.readFileSync('talker.json'));
  const id = parseInt(req.params.id, 10);

  const matchedTalker = talkers.find((talker) => talker.id === id);

  if (matchedTalker) {
    res.send(matchedTalker);
  } else {
    res.status(404).send({ message: 'Pessoa palestrante não encontrada' });
  }
};

module.exports = getTalkerById;
