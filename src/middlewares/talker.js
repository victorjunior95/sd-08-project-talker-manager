const rescue = require('express-rescue');

const talkers = require('../data/talkers');

const getAllTalkers = rescue(async (_req, res, _next) => {
  const result = await talkers.getAll();
  res.status(200).json(result);
});

module.exports = {
  getAllTalkers,
};
