const fs = require('fs').promises;
const { talkers } = require('../Helpers');

const createTalker = (req, res) => {
  const talkersData = talkers();
  const newTalker = req.body;
  newTalker.id = talkersData.length + 1;
  talkersData.push(newTalker);
  fs.writeFileSync('./talker.json', JSON.stringify(talkersData));
  res.status(201).json(talkersData);
};

module.exports = createTalker;
