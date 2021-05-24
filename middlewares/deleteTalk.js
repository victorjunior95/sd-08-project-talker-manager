const fs = require('fs');

const deleteTalk = (req, res) => {
  const { id } = req.params;
  const talker = JSON.parse(fs.readFileSync('./talker.json'));
  const newTalk = talker.filter((talk) => talk.id !== parseInt(id, 10));
  fs.writeFileSync('./talker.json', JSON.stringify(newTalk));
  res.status(200).send({ message: 'Pessoa palestrante deletada com sucesso' });
};

module.exports = deleteTalk;
