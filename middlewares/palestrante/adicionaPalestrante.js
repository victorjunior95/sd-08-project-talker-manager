const fs = require('fs').promises;

module.exports = async (request, response, _next) => {
  const data = await fs.readFile('./talker.json', 'utf8');
  const listaDePalestrantes = JSON.parse(data);
  
  const { body } = request;

  const novoPalestrante = { id: listaDePalestrantes.length + 1, ...body };

  listaDePalestrantes.push(novoPalestrante);

  try {
    await fs.writeFile('./talker.json', JSON.stringify(listaDePalestrantes));
    return response.status(201).json(novoPalestrante);
  } catch (error) {
    return response.status(400).send(`Error: ${error.message}`);
  }
};
