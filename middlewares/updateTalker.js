const fs = require('fs');

const db = 'talker.json';

const updateTalker = (req, res) => {
  const { id } = req.params;
  const talkers = JSON.parse(fs.readFileSync(db, 'utf-8'));

  let resp = talkers.find((talker) => Number(talker.id) === Number(id));
  resp = { ...resp, ...req.body };
  res.status(200).json(resp);
};

module.exports = updateTalker;
