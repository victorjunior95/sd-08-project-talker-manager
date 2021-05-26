const validaTalk = (req, res, next) => {
  const { talk } = req.body;
  if (!talk) {
    res.status(400)
    .send({ message: 'O campo "talk" é obrigatório e "watchedAt" e "rate" não podem ser vazios' });
  }
  const { watchedAt, rate } = req.body.talk;
  if (watchedAt === undefined || rate === undefined) {
    res.status(400)
    .send({ message: 'O campo "talk" é obrigatório e "watchedAt" e "rate" não podem ser vazios' });
  }
  next();
};

module.exports = validaTalk;