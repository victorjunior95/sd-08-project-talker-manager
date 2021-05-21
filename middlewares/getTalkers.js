const fs = require('fs');

const getTalkers = (req, res, _) => {
  try {
    const talkers = fs.readFileSync('./talker.json', 'utf8');
    return res.status(200).send(talkers);
  } catch (err) {
    console.error(`[-] ${err}`);
    return res.status(400).json(err);
  }
};

module.exports = getTalkers;
