const fs = require('fs');

const deleteTalker = (req, res) => {
  try {
    const allTalkers = JSON.parse(fs.readFileSync('talker.json'));
    const searchTerm = req.query.q;

    if (!searchTerm) {
      return res.send(allTalkers);
    }

    const searchRegex = new RegExp(searchTerm, 'i');
    const matchingTalkers = allTalkers.filter((talker) => searchRegex.test(talker.name));

    res.send(matchingTalkers);
  } catch (err) {
    console.error(err);
  }
};

module.exports = deleteTalker;
