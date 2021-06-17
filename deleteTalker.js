const fs = require('fs');
const getTalkers = require('./services/getTalkers');

const deleteTalker = (id) => {
  const currTalkers = getTalkers();
  const talkersReloaded = currTalkers.filter((talker) => talker.id !== id);
  fs.writeFileSync('./talker.json', JSON.stringify(talkersReloaded), 'utf-8');
};

module.exports = (req, res) => {
  try {
    const { id } = req.params;

    deleteTalker(Number(id));

    return res
      .status(200)
      .send({ message: 'Pessoa palestrante deletada com sucesso' });
  } catch (err) {
    return res.status(500).send(err.message);
  }
};
