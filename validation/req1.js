const fs = require('fs');

const req1 = (req, res) => res.status(200).send(
  JSON.parse(fs.readFileSync('./talker.json')),
  
  );

module.exports = req1;