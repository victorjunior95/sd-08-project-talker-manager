const validateDate = (date) => {
  const regexDate = /^\d{1,2}\/\d{1,2}\/\d{4}$/;
  return regexDate.test(date);
};

const talkMiddleware = (_req, res, next) => {
  const { watchedAt, rate } = _req.body.talk;
  if (!watchedAt || !rate) {
    return res.status(400).send({
      message:
        'O campo "talk" é obrigatório e "watchedAt" e "rate" não podem ser vazios',
    });
  }
  next();
};

const rateMiddleware = (_req, res, next) => {
  const { rate } = _req.body.talk;
  if (rate < 1 || rate > 5 || !Number.isInteger(rate)) {
    return res
      .status(400)
      .send({ message: 'O campo "rate" deve ser um inteiro de 1 à 5' });
  }
  next();
};

const dateMiddleware = (_req, res, next) => {
  const { watchedAt } = _req.body.talk;
  const date = validateDate(watchedAt);
  if (!date) {
    return res
      .status(400)
      .send({ message: 'O campo "watchedAt" deve ter o formato "dd/mm/aaaa"' });
  }

  next();
};

module.exports = { talkMiddleware, rateMiddleware, dateMiddleware };
