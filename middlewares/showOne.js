const talkers = require('../talker.json');

module.exports = (req, res) => {
  const { id } = req.params;
  if (!talkers[id - 1]) {
    return res.status(404).json({ message: 'Pessoa palestrante não encontrada' });
  }
  res.status(200).json(talkers[id - 1]);
};
