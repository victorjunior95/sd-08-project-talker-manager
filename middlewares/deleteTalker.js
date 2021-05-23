const fs = require('fs');

const deleteTalker = (req, res, _next) => {
  const rawdata = fs.readFileSync('talker.json');
  const talkers = JSON.parse(rawdata);
  const id = Number(req.params.id);
  const newTalkers = talkers.filter((t) => t.id !== id);
  fs.writeFile('../talker.json', JSON.stringify(newTalkers), (err) => {
    if (err) throw err;
  });
  res.status(201).json({ message: 'Pessoa palestrante deletada com sucesso' });
};
module.exports = deleteTalker;