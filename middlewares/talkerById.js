const fs = require('fs');

const db = 'talker.json';

const talkerById = (req, res) => {
  const { id } = req.params;
  const talkers = JSON.parse(fs.readFileSync(db, 'utf-8'));

  const resp = talkers.find((talker) => talker.id === Number(id));
  return resp
    ? res.status(200).json(resp)
    : res.status(404).json({
      message: 'Pessoa palestrante não encontrada',
    });
};

module.exports = talkerById;
