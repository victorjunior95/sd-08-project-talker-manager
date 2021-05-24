const rescue = require('express-rescue');
const talkerSchema = require('../../schema/addTalker');
const { lerPalestrantes, inserirPalestrantes } = require('../../utils');

module.exports = rescue(async (req, res, next) => {
  const { error } = talkerSchema.validate(req.body, { abortEarly: false });

  if (error) return next(error);

  const { id } = req.params;
  const talkers = await lerPalestrantes();
  const talkersWithoutId = talkers.filter((talker) => talker.id !== Number(id));

  const updateTalker = {
    id: Number(id),
    ...req.body,
  };

  const updatedTalker = talkersWithoutId.concat(updateTalker);
  await inserirPalestrantes(updatedTalker);

  res.status(200).json(updateTalker);
});
