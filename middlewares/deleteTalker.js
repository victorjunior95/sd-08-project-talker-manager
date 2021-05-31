const fs = require('fs');

const db = 'talker.json';

const deleteTalker = (req, res) => {
  const { id } = req.params;

  const talkers = JSON.parse(fs.readFileSync(db, 'utf-8'));
  const newTalkerDB = talkers.find((talker) => Number(talker.id) !== Number(id));

  fs.writeFileSync('talker.json', JSON.stringify(newTalkerDB));
  res.status(200).json({ message: 'Pessoa palestrante deletada com sucesso' });
};

module.exports = deleteTalker;
