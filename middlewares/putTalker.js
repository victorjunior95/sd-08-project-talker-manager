const { promises } = require('fs');
const editTalker = require('../helpers/editTalker');
const replaceTalker = require('../helpers/replaceTalker');

const nomeDoArquivo = 'talker.json';

const putTalker = (req, res) => {
  const obj = editTalker(req);
  const content = replaceTalker(obj);
  promises.writeFile(nomeDoArquivo, content)
    .then(() => res.status(201).send(obj))
    .catch((err) => console.log(err.message));
};

module.exports = putTalker;