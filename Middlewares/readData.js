const rescue = require('express-rescue');
const { readFile } = require('../Utils');

module.exports = (dataPath) => rescue(async (req, _res, next) => {
  req.readData = await readFile(dataPath);
  next();
});
