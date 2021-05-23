const rescue = require('express-rescue');
const { getAllPeople, setNewTalker } = require('../util');
const validityAll = require('../util/validityTalker');

const createTalker = rescue(async (req, res, next) => {
  const talker = req.body;
  const result = validityAll(talker).find((el) => typeof el === 'object');
  if (!result) {
    const talkers = await getAllPeople();
    const length = Math.max(...talkers.map((el) => el.id));
    talker.id = length + 1;
    console.log(talker);
    talkers.push(talker);
    await setNewTalker(talkers);
    res.status(201).json(talker);
  } else {
    next(result);
  }
});

module.exports = createTalker;
