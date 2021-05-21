const readfile = require('../Services/readfile');

module.exports = (_req, res) => {
  readfile()
  .then((data) => res.status(200).json(data))
  .catch((err) => console.log(err.message));
};
