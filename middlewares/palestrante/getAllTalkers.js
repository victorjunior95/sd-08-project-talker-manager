const fs = require('fs').promises;

module.exports = async (_request, response) => {
  const data = await fs.readFile('./talker.json', 'utf8');
  return response.status(200).json(await JSON.parse(data));
};
