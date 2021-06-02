const talkers = require('../helpers/talkers');

const req7 = (req, res, next) => {
const retornoPesquisa = talkers().filter((tk) => tk.name.includs(req.query.q));
res.status(200).json(retornoPesquisa);
next();
};

module.exports = req7; 
