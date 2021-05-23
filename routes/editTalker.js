const fs = require('fs');

const getTalkers = () => JSON.parse(fs.readFileSync('talker.json', 'utf8'));
module.exports = (req, res) => {
  try {
    const talkers = getTalkers();
    const { id } = req.params;
    const newTalker = req.body;
    newTalker.id = Number(id);
    const index = talkers.findIndex((talker) => talker.id === Number(id));
    talkers[index] = newTalker;
    fs.writeFileSync('talker.json', JSON.stringify(talkers));
    res.status(200).json(newTalker);
  } catch (err) {
    return res.status(500).send({ err });
  }
};
