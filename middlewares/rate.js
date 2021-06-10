module.exports = (req, res, next) => {
  const { talk } = req.body;
    if (
      !req.body.talk
        || typeof talk.rate !== 'number'
    ) {
      next();
    }
    if (talk.rate < 1 || talk.rate > 5) {
      return res
        .status(400)
        .send({ message: 'O campo "rate" deve ser um inteiro de 1 à 5' });
    }
    next();
  };