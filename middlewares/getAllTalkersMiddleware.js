const fs = require('fs').promises;

module.exports = async (_request, response) => {
  const file = await fs.readFile(`${__dirname}/../talker.json`, 'utf-8')
    .then((data) => JSON.parse(data))
    .catch((err) => console.log(err));
  return response.status(200).json(file);
};