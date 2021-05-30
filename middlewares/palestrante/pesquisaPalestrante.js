const fs = require('fs').promises;

module.exports = async (request, response, _next) => {
  const data = await fs.readFile('./talker.json', 'utf8');
  const listaDePalestrantes = (JSON.parse(data));
  let query = request.query.q;

  if (!query) {
    query = '';
  }

  const regex = new RegExp(`${query}`);
  const lista = [];
  await listaDePalestrantes.forEach((palestrante) => {
    if (regex.test(palestrante.name)) {
      lista.push(palestrante);
    }
  });
  return response.status(200).json(lista);
};
