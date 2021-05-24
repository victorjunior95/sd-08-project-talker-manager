const readfile = require('../Services/readfile');

const { verifyToken } = require('../Services/dataVerify');

module.exports = (req, res) => {
  const { q } = req.query;
  const auth = req.headers.authorization;

  if (verifyToken(auth, res)) return;

  readfile()
  .then((data) => data.filter((e) => {
    const name = e.name.toLowerCase();
    const query = q.toLowerCase();
    return name.includes(query);
  }))
  .then((data) => res.status(200).json(data));
};