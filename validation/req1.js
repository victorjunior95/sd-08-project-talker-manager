const talkers = require('../helpers/talkers');

const req1 = (req, res) => res.status(200).send(
  talkers(),
  );

module.exports = req1;