const fs = require('fs');
const talkers = require('../talker.json');

// referencia turma 07 - aula 26.05
const addTalker = async (req, res) => {
  const size = talkers.length;
  talkers[size] = {
        name: req.body.name,
        age: req.body.age,
        id: `${size + 1}`,
        talk: {
          watchedAt: req.body.talk.watchedAt,
          rate: req.body.talk.rate,
        },
  };
  try {
  await fs.promises.writeFile(`${__dirname}/../talker.json`, JSON.stringify(talkers));
  res.status(200).json({ message: 'Talker incluido' });
} catch (err) {
  return res.status(500).send({ err });
}
};

module.exports = addTalker;