module.exports = (request, response, next) => {
  const { talk } = request.body;

  if (!talk || talk.rate === undefined || talk.watchedAt === undefined) {
    response.status(400).send({
      message: 'O campo "talk" é obrigatório e "watchedAt" e "rate" não podem ser vazios',
    });
  }

  return next();
};