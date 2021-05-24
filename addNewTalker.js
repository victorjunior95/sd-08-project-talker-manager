const fs = require('fs');

const getTalkers = () => JSON.parse(fs.readFileSync('talker.json', 'utf8'));
module.exports = (req, res) => {
  try {
    const talkers = getTalkers();
    const newTalker = req.body;
    newTalker.id = talkers.length + 1;
    talkers.push(newTalker);
    fs.writeFileSync('talker.json', JSON.stringify(talkers));
    res.status(201).json(newTalker);
  } catch (err) {
    return res.status(500).send({ err });
  }
};