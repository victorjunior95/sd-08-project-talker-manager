module.exports = (req, res, next) => {
  const { talk } = req.body;
  const dateRegex = /^(0?[1-9]|[12][0-9]|3[01])[/-](0?[1-9]|1[012])[/-]\d{4}$/;
  const testDate = dateRegex.test(talk.watchedAt);
  if (!testDate) {
    res.status(400).send({ message: 'O campo "watchedAt" deve ter o formato "dd/mm/aaaa"' });
  }
  if (!Number.isInteger(talk.rate) || talk.rate > 5 || talk.rate < 1) {
    res.status(400).json({ message: 'O campo "rate" deve ser um inteiro de 1 à 5' });
  }
  next();
};
