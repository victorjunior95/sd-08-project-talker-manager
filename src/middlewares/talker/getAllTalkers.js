const rescue = require('express-rescue');

const data = require('../../data');

const getAllTalker = rescue(async (_req, res, _next) => {
  const dataTalker = await data.readFileTalker(); // tratar o possível erro
  res.status(200).json(dataTalker);
});

module.exports = getAllTalker;
