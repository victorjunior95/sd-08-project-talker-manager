const rescue = require('express-rescue');
const { lerJson } = require('./fs-utils');

const ENCONTRADA = 200;

const pesquisa = rescue(async (req, res) => {
  const { q } = req.query;
  const allTalkers = await lerJson();
  if (!q) {
    return res.status(ENCONTRADA).json(allTalkers);
  }
  const result = allTalkers.filter((talker) => talker.name.toLowerCase().includes(q.toLowerCase()));
  return res.status(ENCONTRADA).json(result);
});

module.exports = pesquisa;
