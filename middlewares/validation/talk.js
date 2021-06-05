const talkMiddleware = (req, res, next) => {
  const { talk } = req.body;
  const { watchedAt, rate } = talk;

  if (!talk || !watchedAt || !rate) {
    return res.status(401).json({
      message: 'O campo "talk" é obrigatório e "watchedAt" e "rate" não podem ser vazios',
    });
  }

  next();
};

module.exports = talkMiddleware;
