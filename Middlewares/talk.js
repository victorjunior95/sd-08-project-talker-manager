const talkMiddleware = (req, res, next) => {
  const {
    talk: { watchedAt, rate },
  } = req.body;
  if (!watchedAt || typeof rate !== 'number') {
    return res
      .status(400)
      .send({
        message:
          'O campo "talk" é obrigatório e "watchedAt" e "rate" não podem ser vazios',
      });
  }
  next();
};

module.exports = talkMiddleware;
