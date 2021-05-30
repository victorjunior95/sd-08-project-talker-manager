const fs = require('fs');

module.exports = (req, res) => {
  const { id } = req.params;
  const talker = JSON.parse(fs.readFileSync('./talker.json'));
  const newTalker = talker.filter((data) => data.id !== parseInt(id, 10));
  fs.writeFileSync('./talker.json', JSON.stringify(newTalker));
  res.status(200).send({ message: 'Pessoa palestrante deletada com sucesso' });
};
