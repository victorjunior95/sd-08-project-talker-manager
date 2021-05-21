const fs = require('fs/promises');

module.exports = async (req, res, _next) => {
  const id = Number(req.params.id);
  const data = await fs.readFile('./talker.json');
  const talkers = JSON.parse(data);
  const response = talkers.find((talker) => talker.id === id);

  if (!response) return res.status(404).json({ message: 'Pessoa palestrante não encontrada' });

  res.status(200).json(response);
};
