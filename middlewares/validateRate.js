const validateRate = (req, res, next) => {
  const { talk } = req.body;
  if (typeof talk.rate !== 'number' || talk.rate <= 0 || talk.rate > 5) {
    return res.send(400).send({ message: 'O campo "rate" deve ser um inteiro de 1 à 5' });
  }
  next();
};

module.exports = validateRate;