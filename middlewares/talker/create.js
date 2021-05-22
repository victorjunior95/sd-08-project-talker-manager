const rescue = require('express-rescue');
const { getTalkers, setTalkers } = require('../../utils/fsTalker');
const createTalker = require('../../services/createTalker');

module.exports = rescue(async (req, res) => {
  const talkers = await getTalkers();
  const newTalker = createTalker(req.body, talkers.length + 1);
  talkers.push(newTalker);
  await setTalkers(talkers);
  res.status(201).json(newTalker);
});
