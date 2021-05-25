const fs = require('fs/promises');
const createTalker = require('../helpers/createTalker');
const addTalker = require('../helpers/addTalker');

const nomeDoArquivo = 'talker.json';

const postTalker = (req, res) => {
  const obj = createTalker(req.body);
  const content = addTalker(obj);
  fs.writeFile(nomeDoArquivo, content)
    .then(() => res.status(201).send(obj))
    .catch((err) => console.log(err.message));
};

module.exports = postTalker;