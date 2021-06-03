const talkers = require('../helpers/talkers');

const req7 = (req, res) => {
  console.log('q tem:', req.query.q, 'talkers tem:', talkers());
  const retornoPesquisa = talkers().filter((tk) =>
   tk.name[0] === req.query.q);

res.status(200).json(retornoPesquisa);
};

module.exports = req7; 
