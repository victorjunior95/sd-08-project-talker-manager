const fs = require('fs').promises;

module.exports = async (request, response, _next) => {
  const listaDePalestrantes = await JSON.parse(fs.readFile('./talker.json', 'utf8'));
  const { body } = request;

  body.id = listaDePalestrantes.length + 1;
  listaDePalestrantes.push(body);

  await fs.writeFile('./talker.json', JSON.stringify(listaDePalestrantes));
  response.status(201).json(body);
};
