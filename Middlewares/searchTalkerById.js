const { talkers } = require('../Helpers');

const searchTalkerById = (req, res) => {
  const talkersData = talkers();
  const { id } = req.params;
  const wantedTalker = talkersData.find((talker) => talker.id === parseInt(id, 10));
  if (!wantedTalker) return res.status(404).json({ message: 'Pessoa palestrante não encontrada' });
  return res.status(200).json(wantedTalker);
};

module.exports = searchTalkerById;
