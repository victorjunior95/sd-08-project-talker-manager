const watchedAtValidation = (req, res, next) => {
  const { talk: { watchedAt } } = req.body;
  const validFormat = /^\d{2}\/\d{2}\/\d{4}$/;
  if (!(validFormat.test(watchedAt))) {
   return res.status(400).json({ message: 'O campo "watchedAt" deve ter o formato "dd/mm/aaaa"' });
  }
  next();
};

module.exports = watchedAtValidation;
