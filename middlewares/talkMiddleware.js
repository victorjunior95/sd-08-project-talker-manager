const talkMiddleware = (_req, res, next) => {
  const { talk } = _req.body;
  if (!talk) {
    return res.status(400).send({
      message:
        'O campo "talk" é obrigatório e "watchedAt" e "rate" não podem ser vazios',
    });
  }
  if (talk.watchedAt === undefined || talk.rate === undefined) {
    return res.status(400).send({
      message:
        'O campo "talk" é obrigatório e "watchedAt" e "rate" não podem ser vazios',
    });
  }
  next();
};

const rateMiddleware = (_req, res, next) => {
  const { rate, watchedAt } = _req.body.talk;
  if (rate < 1 || rate > 5 || !Number.isInteger(rate)) {
    return res
      .status(400)
      .send({ message: 'O campo "rate" deve ser um inteiro de 1 à 5' });
  }
  if (!/^\d{1,2}\/\d{1,2}\/\d{4}$/.test(watchedAt)) {
    return res
      .status(400)
      .send({ message: 'O campo "watchedAt" deve ter o formato "dd/mm/aaaa"' });
  }
  next();
};

module.exports = { talkMiddleware, rateMiddleware };
