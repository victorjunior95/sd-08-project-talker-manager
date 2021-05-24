const rescue = require('express-rescue');
const addTalkerSchema = require('../../schema/addTalker');
const { lerPalestrantes, inserirPalestrantes } = require('../../utils');

module.exports = rescue(async (req, res, next) => {
  const { error } = addTalkerSchema.validate(req.body, { abortEarly: false });
  if (error) return next(error);
  
  const talker = await lerPalestrantes();
  const newTalker = {
    id: talker.length + 1,
    ...req.body,
  };
  const talkers = talker.concat(newTalker);
  await inserirPalestrantes(talkers);

  res.status(201).json(newTalker);
});
