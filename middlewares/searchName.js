const fs = require('fs');

const searchName = (req, res) => {
  const { q } = req.query;
  console.log(q);
  const talker = JSON.parse(fs.readFileSync('./talker.json'));
  const searched = talker.filter((talk) => talk.name.includes(q));
  res.status(200).send(searched);
};

module.exports = searchName;
