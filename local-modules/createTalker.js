const fs = require('fs');

const createTalker = (req, res) => {
  try {
    const allTalkers = JSON.parse(fs.readFileSync('talker.json'));
    const id = allTalkers.reduce((acc, val) => (acc.id > val.id ? acc.id : val.id)) + 1;

    const newTalker = { id, ...req.body };

    allTalkers.push(newTalker);
    fs.writeFileSync('talker.json', JSON.stringify(allTalkers));

    res.status(201).send(newTalker);
  } catch (err) {
    console.error(err);
  }
};

module.exports = createTalker;
