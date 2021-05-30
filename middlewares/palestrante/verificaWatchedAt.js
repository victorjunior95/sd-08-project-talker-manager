const ValidaData = (date) => /^\d{2}\/\d{2}\/\d{4}$/g.test(date);

const verificaWatchedAt = (request, response, next) => {
  const { watchedAt } = request.body.talk;

  if (!ValidaData(watchedAt)) {
    return response.status(400)
      .send({ message: 'O campo "watchedAt" deve ter o formato "dd/mm/aaaa"' });
  }

  next();
};

module.exports = verificaWatchedAt;
