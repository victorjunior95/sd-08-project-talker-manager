const fs = require('fs');

const pesquisaPalestrante = async (request, response, _next) => {
  const listaDePalestrantes = await JSON.parse(fs.readFile('./talker.json'));
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

module.exports = pesquisaPalestrante;
