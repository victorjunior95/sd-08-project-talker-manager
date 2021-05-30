module.exports = (request, response, next) => {
  const { talk } = request.body;
  // const { watchedAt, rate } = talk;

  if (!talk) {
    return response
      .status(400)
      .json({
        message: 'O campo "talk" é obrigatório e "watchedAt" e "rate" não podem ser vazios',
      });
  }
  if (typeof talk.rate === 'undefined' || !talk.watchedAt) {
    return response
      .status(400)
      .json({
        message: 'O campo "talk" é obrigatório e "watchedAt" e "rate" não podem ser vazios',
      });
  }
  next();
};
