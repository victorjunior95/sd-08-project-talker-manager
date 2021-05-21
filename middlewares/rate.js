const isRateValid = (rate) => rate >= 1 && rate <= 5;

module.exports = (req, res, next) => {
  const { talk: { rate } } = req.body;
  if (!isRateValid(rate)) {
    return res.status(400).send({ message: 'O campo "rate" deve ser um inteiro de 1 à 5' });
  }
  next();
};
