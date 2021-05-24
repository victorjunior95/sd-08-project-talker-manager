const fs = require('fs');
const { getTalker } = require('../fs-utils');

// referencia turma 07 - aula 26.05
const addTalker = async (req, res) => {
  try {
    const talkers = JSON.parse(fs.readFileSync('talker.json', 'utf-8'));
    const newTalker = req.body;
    newTalker.id = talkers.length + 1;
    talkers.push(newTalker);
  await fs.promises.writeFile(`${__dirname}/../talker.json`, JSON.stringify(talkers));
  res.status(201).json(newTalker);
} catch (err) {
  return res.status(500).send({ err });
}
};

module.exports = addTalker;