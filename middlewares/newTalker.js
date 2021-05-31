const fs = require('fs');
const db = 'talker.json';

const newTalker = (req, res) => {
  const talkers = JSON.parse(fs.readFileSync(db, 'utf-8'));
  const talker = { ...req.body, id: talkers.length + 1 };
  fs.writeFileSync('talker.json', JSON.stringify([...talkers, talker]));
  res.status(201).json(talker);
};

module.exports = newTalker;
