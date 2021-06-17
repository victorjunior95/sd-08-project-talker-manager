const { talkers } = require('../Helpers');

const searchTalkerByName = (req, res) => {
  const talkersData = talkers();
  const { query } = req;  
  if (query) {
    const filteredNames = talkersData.filter(({ name }) => name.includes(query));
    return res.status(200).json(filteredNames);
  }
  return res.status(200).json({ talkersData });
};

module.exports = searchTalkerByName;
