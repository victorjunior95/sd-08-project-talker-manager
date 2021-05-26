const fs = require('fs');

const deleteTalker = (req, res) => {
  const talkers = JSON.parse(fs.readFileSync('talker.json', 'utf8'));
  const { id } = req.params;
  const deletedTalker = parseInt(id, 10);
  const newOnes = talkers.filter((talker) => talker.id !== deletedTalker);
  deletedTalker.id = parseInt(id, 10);
  fs.writeFileSync('talker.json', JSON.stringify(newOnes));
  res.status(200).json({ message: 'Pessoa palestrante deletada com sucesso' });
};

module.exports = deleteTalker;