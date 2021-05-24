const fs = require('fs');
const path = require('path');

const filePath = path.resolve(__dirname, '..', 'talker.json');

const alterTalker = (req, res, _next) => {
  const id = Number(req.params.id);
  const rawdata = fs.readFileSync('talker.json');
  const talkers = JSON.parse(rawdata);
  const talker = talkers.find((t) => t.id === id);
  talker.name = req.body.name;
  talker.age = req.body.age;
  talker.talk.watchedAt = req.body.talk.watchedAt;
  talker.talk.rate = +req.body.talk.rate;
  fs.writeFileSync(filePath, JSON.stringify(talkers));
  res.status(200).json(talker);
};

module.exports = alterTalker;