const fs = require('fs').promises;

module.exports = async (request, response, _next) => {
  const { id } = request.params;
  const data = await fs.readFile('../../talker.json', 'utf8');
  const listaDePalestrantes = JSON.parse(data);

  const palestrante = [listaDePalestrantes].filter((pessoa) => pessoa.id !== Number(id));

  try {
    await fs.writeFile('../../talker.json', JSON.stringify(palestrante));
    return response.status(200).send({ message: 'Pessoa palestrante deletada com sucesso' });
  } catch (error) {
    return response.status(400).send(`Error: ${error.message}`);
  }
};
