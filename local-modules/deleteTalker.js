const fs = require('fs');

const deleteTalker = (req, res) => {
  try {
    const allTalkers = JSON.parse(fs.readFileSync('talker.json'));
    const id = parseInt(req.params.id, 10);
    const talkerIndex = allTalkers.findIndex((talker) => talker.id === id);

    if (talkerIndex === -1) {
      return res.status(404).send({ message: 'Elemento não encontrado' });
    }

    allTalkers.splice(talkerIndex, 1);
    fs.writeFileSync('talker.json', JSON.stringify(allTalkers));

    res.status(200).send({ message: 'Pessoa palestrante deletada com sucesso' });
  } catch (err) {
    console.error(err);
  }
};

module.exports = deleteTalker;
