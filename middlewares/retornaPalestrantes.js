const fs = require('fs');

const arquivoTalkerJson = 'talker.json';

module.exports = (_request, response) => {
  const pessoasCadastradas = fs.readFileSync(arquivoTalkerJson, 'utf-8');
  if (!pessoasCadastradas.length) {
    return response.status(200).send([]);
  }
  return response.status(200).send(JSON.parse(pessoasCadastradas));
};
