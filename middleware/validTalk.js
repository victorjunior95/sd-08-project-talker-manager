const validTalk = (req, res, next) => {
  const { talk: { watchedAt, rate } } = req.body;

  if (!watchedAt.match(/([0-2]\d|3[0-1])\/(0\d|1[0-2])\/\d{4}/)) {
    return res.status(400).json({ message: 'O campo "watchedAt" deve ter o formato "dd/mm/aaaa"' });
  }
  if (!Number.isInteger(rate) || rate < 1 || rate > 5) {
    return res.status(400).json({ message: 'O campo "rate" deve ser um inteiro de 1 à 5' });
  }
  next();
};

module.exports = validTalk;