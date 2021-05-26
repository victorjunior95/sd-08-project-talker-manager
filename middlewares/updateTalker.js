const fs = require('fs');

const updateTalker = (req, res) => {
  const talkers = JSON.parse(fs.readFileSync('talker.json', 'utf8'));
    const { id } = req.params;
    const newOne = req.body;
    newOne.id = parseInt(id, 10);
    const index = talkers.findIndex((talker) => talker.id === parseInt(id, 10));
    talkers[index] = newOne;
    fs.writeFileSync('talker.json', JSON.stringify(talkers));
    res.status(200).json(newOne);
};

module.exports = updateTalker;
