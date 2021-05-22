const util = require('../util');

function getAllPeople(req, res, next) {
  const data = util.getAllPeople();
  if (data.length === 0) return res.status(200).json([]);
  if (data.length > 0) return res.status(200).json(data);
  next({ message: data.message, status: data.status });
}

module.exports = getAllPeople;
