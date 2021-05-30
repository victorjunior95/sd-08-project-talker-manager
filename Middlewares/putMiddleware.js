const fs = require('fs');

const putMiddleware = (req, res) => {
  const { id } = req.params;
  const dbInit = JSON.parse(fs.readFileSync('./talker.json'));
  const index = dbInit.findIndex((person) => person.id === id);
  const newTalker = { id: parseInt(id, 10), ...req.body };
  dbInit.splice(index, 1, newTalker);
  fs.writeFileSync('./talker.json', JSON.stringify(dbInit));
  res.status(200).json(newTalker);
};

module.exports = putMiddleware;
