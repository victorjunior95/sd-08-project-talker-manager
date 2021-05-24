const fs = require('fs');

module.exports = (req, res) => {
  const talkers = JSON.parse(fs.readFileSync('./talker.json', 'utf8'));
  const talkerId = req.params.id;
  const newArr = talkers.filter(({ id }) => id.toString() !== talkerId);
  fs.writeFileSync('./talker.json', JSON.stringify(newArr));
  res.status(200).json({ message: 'Pessoa palestrante deletada com sucesso' });
};
