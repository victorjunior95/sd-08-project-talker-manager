const fs = require('fs/promises');

const getTalkerById = (req, res) => {
  fs.readFile('talker.json')
    .then((raw) => JSON.parse(raw))
    .then((data) => {
      const id = parseInt(req.params.id, 10);
      const matchedTalker = data.find((talker) => talker.id === id);

      if (matchedTalker) {
        res.send(matchedTalker);
      }

      res.status(404).send({ message: 'Pessoa palestrante não encontrada' });
    })
    .catch((err) => console.error(err));
};

module.exports = getTalkerById;
