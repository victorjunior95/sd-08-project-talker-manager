module.exports = (req, res, next) => {
  const { talk } = req.body;
  if (!talk) {
    res.status(400)
    .json({ message: 'O campo "talk" é obrigatório e "watchedAt" e "rate" não podem ser vazios' });
  }
  if (!talk.rate || !talk.watchedAt) {
    res.status(400)
    .json({ message: 'O campo "talk" é obrigatório e "watchedAt" e "rate" não podem ser vazios' });
  }
  next();
};