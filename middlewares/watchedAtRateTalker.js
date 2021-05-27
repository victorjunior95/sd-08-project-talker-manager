const watchedAtRateTalker = ((request, response, next) => {
  const { watchedAt, rate } = request.body.talk;
  const regex = /^[0-9]{2}\/[0-9]{2}\/[0-9]{4}$/;
  
  if (!regex.test(watchedAt)) {
    return response.status(400).send({
      message: 'O campo "watchedAt" deve ter o formato "dd/mm/aaaa"',
    });
  }
  if (!Number(rate) || rate < 1 || rate > 5) {
    return response.status(400).send({
      message: 'O campo "rate" deve ser um inteiro de 1 à 5',
    });
  }

  next();
});

module.exports = watchedAtRateTalker;
