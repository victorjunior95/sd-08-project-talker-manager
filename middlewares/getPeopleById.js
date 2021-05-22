const util = require('../util');

function getPeopleId(req, res, next) {
  const { id } = req.params;
  const peopleId = util.getPeopleById(id);
  
  if (peopleId) {
    return res.status(200).json(peopleId);
  }
  next({ status: 404, message: 'Pessoa palestrante não encontrada' });
}

module.exports = getPeopleId;