const fs = require('fs');

const dbFileName = 'talker.json';

module.exports = (req, res) => {
  const db = JSON.parse(fs.readFileSync(dbFileName, 'utf8'));
  const IdToFind = Number(req.params.id);
  const foundPerson = db.find(({ id }) => id === IdToFind);

  if (!foundPerson) return res.status(404).json({ message: 'Pessoa palestrante não encontrada' });
  return res.status(200).send(foundPerson);
};
