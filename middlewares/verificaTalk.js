module.exports = (request, response, next) => {
  const { talk } = request.body;

  if (!talk || !talk.watchedAt || typeof talk.rate === 'undefined') {
    return response.status(400).send({
      message: 'O campo "talk" é obrigatório e "watchedAt" e "rate" não podem ser vazios',
    });
  }
  next();
};
