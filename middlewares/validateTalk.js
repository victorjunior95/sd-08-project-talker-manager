module.exports = (req, res, next) => {
  if (req.body.talk === undefined) {
    res.status(400)
    .json({ message: 'O campo "talk" é obrigatório e "watchedAt" e "rate" não podem ser vazios' });
  }
  if (req.body.talk.watchedAt === undefined || req.body.talk.rate === undefined) {
    res.status(400)
    .json({ message: 'O campo "talk" é obrigatório e "watchedAt" e "rate" não podem ser vazios' });
  }
  next();
};