const rescue = require('express-rescue');
const { readJSON } = require('../utils');

module.exports = rescue(async (req, _res, next) => {
  req.readData = await readJSON(req.dataPath);
  next();
});
