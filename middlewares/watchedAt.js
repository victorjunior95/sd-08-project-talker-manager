module.exports = (req, res, next) => {
  const { talk: { watchedAt } } = req.body;
  const regex = /^\d{2}\/\d{2}\/\d{4}$/;
  if (!watchedAt) {
    return res.status(400)
    .json({ message: 'O campo "talk" é obrigatório e "watchedAt" e "rate" não podem ser vazios' });
  }
  if (!(regex.test(watchedAt))) {
   return res.status(400).json({ message: 'O campo "watchedAt" deve ter o formato "dd/mm/aaaa"' });
  }
  next();
};
