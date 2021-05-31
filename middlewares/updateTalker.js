const fs = require('fs');

const db = 'talker.json';

const updateTalker = (req, res) => {
  const { id } = req.params;
  const { body } = req;
  const { name, age, talk } = body;

  const talkers = JSON.parse(fs.readFileSync(db, 'utf-8'));

  const old = talkers.find((talker) => Number(talker.id) === Number(id));
  const resp = {
    id: Number(id),
    name,
    age,
    talk,
  };
  talkers.splice(old, 1, resp);
  fs.writeFileSync('talker.json', JSON.stringify(talkers));
  res.status(200).json(resp);
};

module.exports = updateTalker;
