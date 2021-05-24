const fs = require('fs');

module.exports = (req, res) => {
  const talkers = JSON.parse(fs.readFileSync('./talker.json', 'utf8'));
  const talkerId = req.params.id;
  const newTalker = req.body;
  const newArr = talkers.map((talker) => {
    if (talker.id.toString() === talkerId) {
      return { ...newTalker, id: talker.id };
    }
    return talker;
  });
  fs.writeFileSync('./talker.json', JSON.stringify(newArr));
  res.status(200).json(newArr[talkerId - 1]);
};
