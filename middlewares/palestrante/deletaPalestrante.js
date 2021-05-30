const fs = require('fs');

const deletaPalestrante = async (request, response, _next) => {
  const { id } = request.params;
  const listaDePalestrantes = await JSON.parse(fs.readFile('./talker.json'));

  const palestrante = listaDePalestrantes.filter((pessoa) => pessoa.id !== parseInt(id, 10));

  try {
    await fs.writeFileSync('./talker.json', JSON.stringify(palestrante));
    return response.status(200).send({ message: 'Pessoa palestrante deletada com sucesso' });
  } catch (error) {
    return response.status(400).send(`Error: ${error.message}`);
  }
};

module.exports = deletaPalestrante;
