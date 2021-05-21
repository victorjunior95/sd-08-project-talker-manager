const fs = require('fs').promises;

module.exports = async (request, response, _next) => {
  const { id } = request.params;

  const talkers = await fs.readFile(`${__dirname}/../talker.json`, 'utf-8')
  .then((data) => JSON.parse(data))
  .catch((err) => console.log(err));
  const talker = talkers.find((person) => person.id === Number(id));
  if (!talker) {
    return response.status(404).json({ message: 'Pessoa palestrante não encontrada' });
  }
  return response.status(200).json(talker);
};
