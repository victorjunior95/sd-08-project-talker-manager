const rescue = require('express-rescue');
const { getTalkers, setTalkers } = require('../../utils/fsTalker');
const talkerSchema = require('../../schema/talker');

module.exports = rescue(async (req, res, next) => {
  const { error } = talkerSchema.validate(req.body);

  if (error) return next(error);

  const talkers = await getTalkers();
  const newTalker = {
    id: Math.max(...talkers.map((talker) => talker.id)) + 1,
    ...req.body,
  };
  talkers.push(newTalker);
  await setTalkers(talkers);

  res.status(201).json(newTalker);
});
