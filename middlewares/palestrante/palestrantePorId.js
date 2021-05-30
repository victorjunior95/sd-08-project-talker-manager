const fs = require('fs').promises;

module.exports = async (request, response) => {
  const { id } = request.params;
  const data = await fs.readFile('./talker.json', 'utf8');
  const listaDePalestrantes = (JSON.parse(data));
  const pessoaPalestrante = listaDePalestrantes
    .find((pessoa) => pessoa.id === parseInt(id, 10));
  if (!pessoaPalestrante) {
    return response.status(404).send({ message: 'Pessoa palestrante não encontrada' });
  }
  response.status(200).json(pessoaPalestrante);
};
