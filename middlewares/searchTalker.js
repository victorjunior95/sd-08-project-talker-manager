const rescue = require('express-rescue');
const { getAllPeople } = require('../util');

module.exports = rescue(async (req, res) => {
  const data = await getAllPeople();
  if (!req.query.q) {
    res.status(200).json(data);
  } else {
    const { q } = req.query;
    const result = data.filter((el) => el.name.includes(q));
    res.status(200).json(result);
  }
});
