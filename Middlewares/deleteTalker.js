const fs = require('fs').promises;
const { talkers } = require('../Helpers');

const deleteTalker = (req, res) => {
  const talkersData = talkers();
  const idToDelete = req.params.id;
  const talkerToDelete = talkersData.findIndex(
    ({ id }) => id === Number(idToDelete),
  );
  if (talkerToDelete === -1) return null;
  const newTalkersData = talkersData.splice(talkerToDelete, 1)[0];
  fs.writeFileSync('talker.json', JSON.stringify(newTalkersData));
  return res.status(200).json({ message: 'Pessoa palestrante deletada com sucesso' });
};

module.exports = deleteTalker;
