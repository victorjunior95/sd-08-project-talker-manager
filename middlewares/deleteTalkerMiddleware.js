const fs = require('fs').promises;

module.exports = async (request, response) => {
  const { id } = request.params;
  const newId = parseInt(id, 10);
  const allTalkers = await fs.readFile(`${__dirname}/../talker.json`, 'utf-8')
    .then((res) => JSON.parse(res))
    .catch((err) => console.log(err));
  const updatedTalkers = allTalkers.filter((speaker) => speaker.id !== newId);
  await fs.writeFile(`${__dirname}/../talker.json`, JSON.stringify(updatedTalkers));
  return response.status(200).json({ message: 'Pessoa palestrante deletada com sucesso' });
};
