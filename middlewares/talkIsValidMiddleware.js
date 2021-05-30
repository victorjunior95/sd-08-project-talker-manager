function verifyDate(date) {
  const dateRegex = /^(\d{1,2})\/(\d{1,2})\/(\d{4})$/;
  return dateRegex.test(date);
}

module.exports = (req, res, next) => {
  const { talk } = req.body;
  const dateIsValid = verifyDate(talk.watchedAt);

  if (!dateIsValid) {
    return res
      .status(400)
      .send({ message: 'O campo "watchedAt" deve ter o formato "dd/mm/aaaa"' });
  }
  if (!Number.isInteger(talk.rate) || talk.rate < 1 || talk.rate > 5) {
    return res
      .status(400)
      .send({ message: 'O campo "rate" deve ser um inteiro de 1 à 5' });
  }
  return next();
};
