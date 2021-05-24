const fs = require('fs').promises;

module.exports = async (request, response) => {
  const { id } = request.params;
  const newId = parseInt(id, 10);
  const allTalkers = await fs.readFile(`${__dirname}/../talker.json`, 'utf-8')
    .then((res) => JSON.parse(res))
    .catch((err) => console.log(err));
  const talker = request.body;
  const newTalker = { id: newId, ...talker };
  const updatedTalkers = allTalkers.map((speaker) => {
    if (speaker.id === newId) return newTalker;
    return speaker;
  });
  await fs.writeFile(`${__dirname}/../talker.json`, JSON.stringify(updatedTalkers));
  return response.status(200).json(newTalker);
};
