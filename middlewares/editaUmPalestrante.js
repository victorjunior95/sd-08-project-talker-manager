const fs = require('fs');

module.exports = (request, response) => {
  const { id } = request.params;
  const arquivoTalkerJson = 'talker.json';
  const pessoasCadastradas = JSON.parse(fs.readFileSync(arquivoTalkerJson, 'utf-8'));
  // console.log(pessoasCadastradas);
  const buscaPalestrante = pessoasCadastradas.find((pessoa) => pessoa.id === parseInt(id, 10));
  const idPalestrante = pessoasCadastradas.indexOf(buscaPalestrante);
  // console.log(idPalestrante);
  const novoPalestrante = { id: parseInt(id, 10), ...request.body };
  // console.log(novoPalestrante);
  pessoasCadastradas.splice(idPalestrante, 1, novoPalestrante);
  console.log(pessoasCadastradas);
  fs.writeFileSync(arquivoTalkerJson, JSON.stringify(pessoasCadastradas));
  response.status(200).json(novoPalestrante);
};
