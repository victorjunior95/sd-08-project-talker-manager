module.exports = (req, res, next) => {
  const { talk } = req.body;
  const errMessage = 'O campo "talk" é obrigatório e "watchedAt" e "rate" não podem ser vazios';

  if (!talk || talk.watchedAt === undefined || talk.rate === undefined) {
    return res.status(400).json({ message: errMessage });
  }

  next();
};
