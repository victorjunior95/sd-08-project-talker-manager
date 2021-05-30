const fs = require('fs').promises;
const rescue = require('express-rescue');
const isValidTalker = require('../helpers/isValidTalker');

const pathArquivo = './talker.json';
const getTalkers = (url) => fs.readFile(url, 'utf8')
    .then((data) => ({ data: JSON.parse(data), len: JSON.parse(data).length }))
    .catch((err) => {
      console.log(err);
    });

module.exports = rescue(async (req, res, _next) => {
  const { name, age, talk } = req.body;
  const validation = isValidTalker(name, age, talk);
  if (validation.message) {
    return res.status(400).json(validation);
  }
  const talkers = await getTalkers(pathArquivo);
  const id = talkers.len + 1;
  talkers.data.push({ name, age, id, talk });
  await fs.writeFile(pathArquivo, JSON.stringify(talkers.data));
  return res.status(201).json({ name, age, id, talk });
});
