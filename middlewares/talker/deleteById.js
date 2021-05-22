const rescue = require('express-rescue');
const { getTalkers, setTalkers } = require('../../utils/fsTalker');

module.exports = rescue(async (req, res) => {
  const { id } = req.params;
  const talkers = await getTalkers();
  const newTalkers = talkers.filter((currentTalker) => currentTalker.id !== Number(id));
  await setTalkers(newTalkers);
  res.status(200).json({ message: 'Pessoa palestrante deletada com sucesso' });
});
