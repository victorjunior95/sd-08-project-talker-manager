const rescue = require('express-rescue');
const { getTalkers, setTalkers } = require('../../utils/fsTalker');
const createTalker = require('../../services/createTalker');

module.exports = rescue(async (req, res) => {
  const { id } = req.params;
  const talkers = await getTalkers();
  const newTalker = createTalker(req.body, id);
  const newTalkers = talkers.map((currentTalker) => {
    if (currentTalker.id === Number(id)) return newTalker;
    return currentTalker;
  });
  await setTalkers(newTalkers);
  res.status(200).json(newTalker);
});
