const fs = require('fs').promises;

module.exports = async (request, response, _next) => {
  const data = await fs.readFile('../../talker.json', 'utf8');
  const listaDePalestrantes = (JSON.parse(data));
  
  const { body } = request;

  body.id = listaDePalestrantes.length + 1;
  // listaDePalestrantes.push(body);

  await fs.writeFile('../../talker.json', JSON.stringify(listaDePalestrantes));
  response.status(201).json(body);
};
