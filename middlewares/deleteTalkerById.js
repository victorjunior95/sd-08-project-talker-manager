const fs = require('fs/promises');

module.exports = async (req, res, _next) => {
  const id = Number(req.params.id);
  const data = await fs.readFile('./talker.json');
  const talkers = JSON.parse(data);
  const newTalkers = talkers.filter((talker) => talker.id !== id);

  await fs.writeFile('./talker.json', JSON.stringify(newTalkers));

  res.status(200).json({ message: 'Pessoa palestrante deletada com sucesso' });
};
