const rescue = require('express-rescue');
const boom = require('@hapi/boom');
const data = require('../../data');

const getTalkerById = rescue(async (req, res) => {
  const { id } = req.params;
  const dataTalkers = await data.readFileTalker(); // Tratar possível erro
  const findTalker = dataTalkers.find((talker) => talker.id === +id);
  if (!findTalker) {
    throw boom.notFound('Pessoa palestrante não encontrada');
  }
  res.status(200).send(findTalker);
});

module.exports = getTalkerById;
