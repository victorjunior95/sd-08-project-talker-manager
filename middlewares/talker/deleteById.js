const rescue = require('express-rescue');
const { lerPalestrantes, inserirPalestrantes } = require('../../utils');

module.exports = rescue(async (req, res) => {
  const { id } = req.params;

  const talkers = await lerPalestrantes();

  const talkersWithoutId = talkers.filter((talker) => talker.id !== Number(id));

  await inserirPalestrantes(talkersWithoutId);

  res.status(200).json({ message: 'Pessoa palestrante deletada com sucesso' });
});
