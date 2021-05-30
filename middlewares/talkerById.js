const fs = require('fs');

const db = 'talker.json';

const talkerById = (req, res) => {
  const { id } = req.params;
  const talkers = JSON.parse(fs.readFileSync(db, 'utf-8'));

  const resp = talkers.find((talker) => Number(talker.id) === Number(id));
  return (!resp)
    ? res.status(404).json({ message: 'Pessoa palestrante não encontrada' })
    : res.status(200).json(resp);
};

module.exports = talkerById;
