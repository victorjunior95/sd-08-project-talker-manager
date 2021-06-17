const { talkers } = require('../Helpers');

const searchTalkerById = async (req, res) => {
  const talkersData = await talkers();
  const wantedId = req.params.id;
  const wantedTalker = talkersData.find(({ id }) => id === parseInt(wantedId, 10));
  if (!wantedTalker) return res.status(404).json({ message: 'Pessoa palestrante não encontrada' });
  return res.status(200).json(wantedTalker);
};

module.exports = searchTalkerById;
