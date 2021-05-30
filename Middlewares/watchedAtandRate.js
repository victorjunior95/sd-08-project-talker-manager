const dateRegex = /\d{2}\/\d{2}\/\d{4}/;
const watchedAtandRate = (req, res, next) => {
  const { talk: { watchedAt, rate } } = req.body;
  if (!dateRegex.test(watchedAt)) {
    return res
      .status(400)
      .send({ message: 'O campo "watchedAt" deve ter o formato "dd/mm/aaaa"' });
  }
  if (rate < 1 || rate > 5) {
    return res
      .status(400)
      .send({ message: 'O campo "rate" deve ser um inteiro de 1 à 5' });
  }  
  return next();
};

module.exports = watchedAtandRate;
