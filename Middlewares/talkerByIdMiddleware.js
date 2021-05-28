const fs = require('fs');

const talkerByIdMiddleware = (req, res) => {
  const { id } = req.params;
  const dbTalker = JSON.parse(fs.readFileSync('talker.json', 'utf8'));
  const talkerById = dbTalker.find((talkerId) => talkerId.id === Number(id));
  if (talkerById) return res.status(200).json(talkerById); 
  if (!talkerById) return res.status(404).json({ message: 'Pessoa palestrante não encontrada' });
};

module.exports = talkerByIdMiddleware;