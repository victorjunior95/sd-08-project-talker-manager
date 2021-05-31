const fs = require('fs').promises;

module.exports = async (request, response, _next) => {
  const data = await fs.readFile('./talker.json', 'utf8');
  const listaDePalestrantes = JSON.parse(data);
  const { id } = request.params;

  const palestrante = listaDePalestrantes.map((pessoa) => {
    if (pessoa.id === Number(id)) return { ...pessoa, ...request.body };
    return pessoa;
  });
  await fs.writeFile('./talker.json', JSON.stringify(palestrante));
  response.status(200).json(palestrante.find((pessoa) => pessoa.id === Number(id)));
};
