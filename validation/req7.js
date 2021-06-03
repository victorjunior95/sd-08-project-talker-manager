const talkers = require('../helpers/talkers');

const req7 = (req, res) => {
  const retornoPesquisa = talkers().filter((tk) => tk.name.includs(req.query.q));
res.status(201).json(retornoPesquisa);
};

module.exports = req7; 
