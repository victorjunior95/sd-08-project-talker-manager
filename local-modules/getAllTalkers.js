const fs = require('fs');

const getAllTalkers = (_req, res) => {
  try {
    const talkers = JSON.parse(fs.readFileSync('talker.json', 'utf-8'));
    res.send(talkers);
  } catch (err) {
    res.status(500).send('Could not process information');
  }
};

module.exports = getAllTalkers;
