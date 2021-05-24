const fs = require('fs');
const path = require('path');

const filePath = path.resolve(__dirname, '..', 'talker.json');

const deleteTalker = (req, res, _next) => {
  const rawdata = fs.readFileSync('talker.json');
  const talkers = JSON.parse(rawdata);
  const id = Number(req.params.id);
  const newTalkers = talkers.filter((t) => t.id !== id);
  fs.writeFileSync(filePath, JSON.stringify(newTalkers));
  res.status(200).json({ message: 'Pessoa palestrante deletada com sucesso' });
};
module.exports = deleteTalker;