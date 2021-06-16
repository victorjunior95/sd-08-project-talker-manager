const rescue = require('express-rescue');

const talkers = require('../data/talkers');

const getAllTalkers = rescue(async (_req, res, _next) => {
  const result = await talkers.getAll();
  res.status(200).json(result);
});

const getTalkerById = rescue(async (req, res, _next) => {
  const { id } = req.params;
  const result = await talkers.getById(id);
  if (!result || result.length < 1) {
    return res.status(404).send({
      message: 'Pessoa palestrante não encontrada',
    });
  }
  res.status(200).json(result[0]);
});

module.exports = {
  getAllTalkers,
  getTalkerById,
};
