const fs = require('fs');

const getTalkers = () => JSON.parse(fs.readFileSync('talker.json', 'utf8'));
module.exports = (req, res, _next) => {
  const { id } = req.params;
  const talkers = getTalkers();
  const deleteTalker = talkers.filter((e) => e.id !== Number(id));
  fs.writeFileSync('talker.json', JSON.stringify(deleteTalker));
  res
  .status(200)
  .json({ message: 'Pessoa palestrante deletada com sucesso' });
};
