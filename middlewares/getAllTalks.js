const fs = require('fs');

module.exports = (req, res, _next) => {
  const list = JSON.parse(fs.readFileSync('talker.json'));
  res.status(200).send(list);
};
