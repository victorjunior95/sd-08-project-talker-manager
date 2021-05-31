const fs = require('fs');

module.exports = (request, response) => {
  const { id } = request.params;
  const arquivoTalkerJson = 'talker.json';
  const pessoasCadastradas = JSON.parse(fs.readFileSync(arquivoTalkerJson, 'utf-8'));
  const palestrante = pessoasCadastradas.find((pessoa) => pessoa.id !== parseInt(id, 10));

  try {
    fs.writeFileSync(arquivoTalkerJson, JSON.stringify(palestrante));
    return response.status(200).send({ message: 'Pessoa palestrante deletada com sucesso' });
  } catch (error) {
    return response.status(400).send(`Error: ${error.message}`);
  }
};
