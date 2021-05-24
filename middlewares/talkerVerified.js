const fs = require('fs');

const talkerVerified = (req, res) => {
  const talker = JSON.parse(fs.readFileSync('./talker.json'));
  const reqbody = { id: talker.length + 1, ...req.body };
  const newPerson = JSON.stringify([...talker, reqbody]);
  fs.writeFileSync('./talker.json', newPerson);
  res.status(201).json(reqbody);
};

module.exports = talkerVerified;
