const validateEmptyWatched = (req, res, next) => {
  const { talk } = req.body;
  if (talk.watchedAt === undefined) {
    return res.status(400).send({
      message: 'O campo "talk" é obrigatório e "watchedAt" e "rate" não podem ser vazios',
    });
  }
  next();
};

module.exports = validateEmptyWatched;