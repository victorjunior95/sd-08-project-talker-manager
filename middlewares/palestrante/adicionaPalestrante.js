const fs = require('fs').promises;

const adicionaPalestrante = async (request, response) => {
  const listaDePalestrantes = await JSON.parse(fs.readFile('./talker.json', 'utf8'));
  const { body } = request;

  body.id = listaDePalestrantes.length + 1;
  listaDePalestrantes.push(body);

  fs.writeFile('./talker.json', JSON.stringify(listaDePalestrantes));
  response.status(201).json(body);
};

module.exports = adicionaPalestrante;
