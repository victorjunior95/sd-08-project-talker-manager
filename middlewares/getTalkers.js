const fs = require('fs');

const getTalkers = (_req, res, _next) => {
  try {
    const fileContent = fs.readFileSync('./talker.json', 'utf8');
    const talkers = JSON.parse(fileContent) || [];
    return res.status(200).json(talkers);
  } catch (err) {
    return res.status(500).send(err);
  }
};

module.exports = getTalkers;
