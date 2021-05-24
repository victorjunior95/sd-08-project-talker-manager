const fs = require('fs');

const getAll = (req, res) => {
  const content = JSON.parse(fs.readFileSync('./talker.json'));
  return res.status(200).send(content);
 };

module.exports = { getAll };