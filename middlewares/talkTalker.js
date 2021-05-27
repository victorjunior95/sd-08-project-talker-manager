const talkTalker = ((request, response, next) => {
  const { talk } = request.body;

  if (!talk || !talk.watchedAt || !talk.rate) {
    return response.status(400).send({
      message: 'O campo "talk" é obrigatório e "watchedAt" e "rate" não podem ser vazios',
    });
  }

  next();
});

module.exports = talkTalker;
