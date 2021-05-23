const rescue = require('express-rescue');
const util = require('../util');

module.exports = rescue(async (req, res, next) => {
  const data = await util.getAllPeople();
  if (data.length === 0) return res.status(200).json([]);
  if (data.length > 0) return res.status(200).json(data);
  next({ message: data.message, status: data.status });
});
