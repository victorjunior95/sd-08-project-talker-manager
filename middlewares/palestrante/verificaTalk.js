const verificaTalk = (request, response, next) => {
  const { talk } = request.body;
  const { watchedAt, rate } = request.body.talk;

  if (!talk || !watchedAt || rate === undefined || rate === '""') {
    return response
      .status(400)
      .send({
        message: 'O campo "talk" é obrigatório e "watchedAt" e "rate" não podem ser vazios',
      });
  }
  next();
};

module.exports = verificaTalk;
