const rescue = require('express-rescue');
const { getAllPeople, setNewTalker } = require('../util');
const validityTalker = require('../util/validityTalker');

module.exports = rescue(async (req, res, next) => {
  const { id } = req.params;
  const talker = req.body;
  const resultValidation = validityTalker(talker).find((el) => typeof el === 'object');
  if (!resultValidation) {
    const allTalker = await getAllPeople();
    talker.id = Number(id);
    const resultAtt = allTalker.map((el) => {
      if (el.id === talker.id) {
        return { ...el, ...talker,
        };
      }
      return el;
    });
    await setNewTalker(resultAtt);
    res.status(200).json(talker);
  }
  next(resultValidation);
});