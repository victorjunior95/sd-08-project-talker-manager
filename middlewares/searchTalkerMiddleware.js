const fs = require('fs').promises;

module.exports = async (request, response) => {
  const { q } = request.query;
  const allTalkers = await fs.readFile(`${__dirname}/../talker.json`, 'utf-8')
    .then((res) => JSON.parse(res))
    .catch((err) => console.log(err));
  if (!q) {
    return response.status(200).json(allTalkers);
  }
  const foundTalkers = allTalkers.filter((talker) => talker.name.includes(q));
  return response.status(200).json(foundTalkers);
};