const fs = require('fs');

const arquivoTalkerJson = 'talker.json';

module.exports = (request, response) => {
  const pessoasCadastradas = JSON.parse(fs.readFileSync(arquivoTalkerJson, 'utf-8'));
  const idPalestrante = parseInt(request.params.id, 6);
  const palestrante = pessoasCadastradas.find(
    ({ id }) => id === (idPalestrante),
  );

  if (!palestrante) {
    return response.status(404).send({
      message: 'Pessoa palestrante não encontrada' });
  }
  return response.status(200).send(palestrante);
};
