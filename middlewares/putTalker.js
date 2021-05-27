const { promises } = require('fs');
const editTalker = require('../helpers/editTalker');
const replaceTalker = require('../helpers/replaceTalker');

const nomeDoArquivo = 'talker.json';

const putTalker = (req, res) => {
  const { body } = req;
  const { id } = req.params;
  const newObj = editTalker(body, id);
  // console.log(newObj);
  const content = replaceTalker(newObj, Number(id));
  // console.log(content);
  promises.writeFile(nomeDoArquivo, content)
    .then(() => res.status(200).send(JSON.stringify(newObj)));
};

module.exports = putTalker;