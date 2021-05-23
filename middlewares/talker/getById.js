const rescue = require('express-rescue');
const boom = require('@hapi/boom');
const { getTalkers } = require('../../utils/fsTalker');

module.exports = rescue(async (req, res) => {
  const { id } = req.params;

  const talkers = await getTalkers();
  const result = talkers.find((currentTalker) => currentTalker.id === Number(id));

  if (!result) throw boom.notFound('Pessoa palestrante não encontrada');

  res.status(200).json(result);
});
