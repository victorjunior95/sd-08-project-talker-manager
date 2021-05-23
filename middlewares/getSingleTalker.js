const fs = require('fs');

const getSingleTalker = (req, res, _next) => {
  const rawdata = fs.readFileSync('talker.json');
  const talkers = JSON.parse(rawdata);
  const id = Number(req.params.id);
  const talker = talkers.find((t) => t.id === id);
  if (!talker) {
    return res.status(404).json({
      message: 'Pessoa palestrante não encontrada',
    });
  }
  res.status(200).json(talker);
};

module.exports = getSingleTalker;