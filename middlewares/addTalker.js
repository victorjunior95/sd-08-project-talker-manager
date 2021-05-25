const fs = require('fs');

// referencia turma 07 - aula 26.05
const addTalker = (req, res) => {
  const talkers = JSON.parse(fs.readFileSync('talker.json', 'utf-8'));
  const newTalker = req.body;
  newTalker.id = talkers.length + 1;
  talkers.push(newTalker);
  fs.writeFileSync('talker.json', JSON.stringify(talkers));
  res.status(201).json(newTalker);
};

module.exports = addTalker;