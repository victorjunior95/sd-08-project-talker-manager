const { promises } = require('fs');
const removeTalker = require('../helpers/removeTalker');

const nomeDoArquivo = 'talker.json';

const deleteTalker = (req, res) => {
  const { id } = req.params;
  const content = removeTalker(Number(id));
  promises.writeFile(nomeDoArquivo, content)
    .then(() => res.status(200).send({ message: 'Pessoa palestrante deletada com sucesso' }));
};

module.exports = deleteTalker;