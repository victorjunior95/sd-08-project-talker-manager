module.exports = (request, response, next) => {
  const regex = /\d{2}\/\d{2}\/\d{4}/;
  const { watchedAt } = request.body.talk;

  if (!regex.test(watchedAt)) {
    return response.status(400).send({
      message: 'O campo "watchedAt" deve ter o formato "dd/mm/aaaa"',
    });
  }
  next();
};
