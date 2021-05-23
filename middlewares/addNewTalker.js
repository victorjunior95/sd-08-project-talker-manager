const fs = require('fs');

const addNewTalker = (req, res, _next) => {
  const rawdata = fs.readFileSync('talker.json');
  const talkers = JSON.parse(rawdata);
  const newTalker = {
    id: talkers.length + 1, 
    name: req.body.name,
    age: req.body.age,
    talk: {
      watchedAt: req.body.talk.watchedAt,
      rate: +req.body.talk.rate,
    },
  };
  talkers.push(newTalker);
  fs.writeFileSync('../talker.json', JSON.stringify(talkers));
  res.status(201).json(newTalker);
};

module.exports = addNewTalker;