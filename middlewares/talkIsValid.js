const DATE_REGEX = /^(\d{1,2})\/(\d{1,2})\/(\d{4})$/;

module.exports = (request, response, next) => {
  const { talk } = request.body;
  const isValid = DATE_REGEX.test(talk.watchedAt);

  if (!isValid) {
    response
      .status(400)
      .send({ message: 'O campo "watchedAt" deve ter o formato "dd/mm/aaaa"' });
  } else if (!Number.isInteger(talk.rate) || talk.rate < 1 || talk.rate > 5) {
    response
      .status(400)
      .send({ message: 'O campo "rate" deve ser um inteiro de 1 à 5' });
  }

  return next();
};