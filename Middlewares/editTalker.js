const fs = require('fs').promises;
const { talkers } = require('../Helpers');

const editTalker = (req, res) => {
  const talkersData = talkers();
  const wantedTalker = req.body;
  const wantedId = Number(req.params.id);
  const updatedTalkers = talkersData.map(({ id }) => {
    if (id === wantedId) return { ...wantedTalker };
    return talkersData;
  });
  fs.writeFileSync('talker.json', JSON.stringify(updatedTalkers));
  return res.status(200).json(wantedTalker);
};

module.exports = editTalker;
