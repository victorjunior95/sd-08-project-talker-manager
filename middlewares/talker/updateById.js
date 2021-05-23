const rescue = require('express-rescue');
const { getTalkers, setTalkers } = require('../../utils/fsTalker');
const talkerSchema = require('../../schema/talker');

module.exports = rescue(async (req, res, next) => {
  const { error } = talkerSchema.validate(req.body);

  if (error) return next(error);

  const { id } = req.params;

  const talkers = await getTalkers();

  const newTalkers = talkers.map((currentTalker) => {
    if (currentTalker.id === Number(id)) return { ...currentTalker, ...req.body };
    return currentTalker;
  });

  await setTalkers(newTalkers);
  res.status(200).json(newTalkers.find((currentTalker) => currentTalker.id === Number(id)));
});
