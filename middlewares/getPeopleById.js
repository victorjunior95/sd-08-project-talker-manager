const rescue = require('express-rescue');
const util = require('../util');

module.exports = rescue(async (req, res, next) => {
  const { id } = req.params;
  const peopleId = await util.getPeopleById(id);
  
  if (peopleId) {
    return res.status(200).json(peopleId);
  }
  next({ status: 404, message: 'Pessoa palestrante não encontrada' });
});
