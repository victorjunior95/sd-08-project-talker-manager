const fs = require('fs');

const deleteTalker = (req, res, _next) => {
  const { id } = req.params;
  const intId = parseInt(id, 10);

  const talkers = JSON.parse(fs.readFileSync('./talker.json', 'utf8'));
  const filtredTalkers = talkers.filter((talker) => talker.id !== intId);

  fs.writeFileSync('./talker.json', JSON.stringify(filtredTalkers));

  return res.status(200).json({ message: 'Pessoa palestrante deletada com sucesso' });
};

module.exports = deleteTalker;
