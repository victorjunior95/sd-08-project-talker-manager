const fs = require('fs');

// referencia turma 07 - aula 26.05
const updateTalker = (req, res) => {
  const { id } = req.params;
  const talkers = JSON.parse(fs.readFileSync('talker.json', 'utf8'));
  const response = talkers.find((person) => person.id === Number(id));
  if (response) {
    res.status(200).json(response); 
  }
};

module.exports = updateTalker;