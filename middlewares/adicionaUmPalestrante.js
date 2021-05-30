const fs = require('fs');

const arquivoTalkerJson = 'talker.json';

module.exports = async (request, response) => {
  const pessoasCadastradas = JSON.parse(fs.readFileSync(arquivoTalkerJson, 'utf-8'));
  const { body } = request;

  body.id = pessoasCadastradas.length + 1;
  pessoasCadastradas.push(body);

  fs.writeFileSync(arquivoTalkerJson, JSON.stringify(pessoasCadastradas));
  response.status(201).send(body);
};
