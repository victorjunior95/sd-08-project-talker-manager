const { talkers } = require('../Helpers');

const getTalkersData = (_req, res) => {
  const talkersData = talkers();
  if (talkersData.length === 0) return res.status(200).json([]);
  return res.status(200).json(talkersData);
};

module.exports = getTalkersData;
