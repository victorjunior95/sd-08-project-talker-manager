const rescue = require('express-rescue');
const { readJSON } = require('../utils');

module.exports = (dataPath) => rescue(async (req, _res, next) => {
  req.readData = await readJSON(dataPath);
  next();
});
