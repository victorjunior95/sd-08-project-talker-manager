const fs = require('fs');

const editTalker = (req, res) => {
  try {
    const allTalkers = JSON.parse(fs.readFileSync('talker.json'));
    const id = parseInt(req.params.id, 10);
    const talkerIndex = allTalkers.findIndex((talker) => talker.id === id);

    if (talkerIndex === -1) {
      return res.status(404).send({ message: 'Elemento não encontrado' });
    }

    const editedTalker = { id, ...req.body };

    allTalkers.splice(talkerIndex, 1, editedTalker);
    fs.writeFileSync('talker.json', JSON.stringify(allTalkers));

    res.status(200).send(editedTalker);
  } catch (err) {
    console.error(err);
  }
};

module.exports = editTalker;
