module.exports = (req, res, next) => {
  const { talk } = req.body;
  // typeof nesse caso foi usado para evitar o bug do 0, que em JS é false.
  if (!talk || !talk.watchedAt || typeof talk.rate !== 'number') { 
 return res.status(400)
  .send({ 
    message: 'O campo "talk" é obrigatório e "watchedAt" e "rate" não podem ser vazios' }); 
}
  next();
};
