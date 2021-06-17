const rescue = require('express-rescue');
const { nanoid } = require('nanoid');
const { writeJSON } = require('../utils');

module.exports = (dataPath) => rescue(async (req, _res, next) => {
  const token = nanoid(16);
  req.token = token;
  const newData = JSON.stringify({ token });
  await writeJSON(dataPath, newData, true);
  next();
});
