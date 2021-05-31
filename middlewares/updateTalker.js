const fs = require('fs');

const db = 'talker.json';

const updateTalker = (req, res) => {
  const { id } = req.params;
  const talkers = JSON.parse(fs.readFileSync(db, 'utf-8'));

  const resp = talkers.find((talker) => {
    if (Number(talker.id) === Number(id)) {
      talker = { ...talker, ...req.body };
    }
    return talker;
  });
  res.status(200).json(resp);
};

module.exports = updateTalker;
