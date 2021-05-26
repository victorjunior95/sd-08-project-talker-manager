const fs = require('fs');

const validaCadastro = (req, res) => {
  const talker = JSON.parse(fs.readFileSync('./talker.json'));
  const body = { id: talker.length + 1, ...req.body };
  const newTalker = JSON.stringify([...talker, ...body]);
  fs.writeFileSync('./talker.json', newTalker);
  res.status(201).json(body);
};

module.exports = validaCadastro;