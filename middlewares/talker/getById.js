const rescue = require('express-rescue');
const boom = require('@hapi/boom');
const lerPalestrante = require('../../utils');

module.exports = rescue(async (req, res) => {
  const { id } = req.params;
  const talkers = await lerPalestrante();

  const talkerId = talkers.find((talker) => talker.id === Number(id));
  
  if (!talkerId) throw boom.notFound('Pessoa palestrante não encontrada');

  res.status(200).send(talkerId);
});
