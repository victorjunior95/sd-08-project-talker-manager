const dateValidation = (req, res, next) => {
  const { talk } = req.body;
  const { watchedAt, rate } = talk;
  const dateRegex = /^(0[1-9]|[12][0-9]|3[01])\/(0[1-9]|1[012])\/[12][0-9]{3}$/i;

  if (!dateRegex.test(watchedAt)) {
    return res.status(400)
      .send({ message: 'O campo "watchedAt" deve ter o formato "dd/mm/aaaa"' });
  }
  if (rate < 1 || rate > 5) {
    return res.status(400)
      .send({ message: 'O campo "rate" deve ser um inteiro de 1 à 5' });
  }
  next();
};

const talkValidationExists = (req, res, next) => {
  const { talk } = req.body;

  if (!talk) {
    return res.status(400)
      .send({
        message: 'O campo "talk" é obrigatório e "watchedAt" e "rate" não podem ser vazios',
      });
  }

  const { watchedAt, rate } = talk;

  if (watchedAt === undefined || rate === undefined) {
    return res.status(400)
      .send({
        message: 'O campo "talk" é obrigatório e "watchedAt" e "rate" não podem ser vazios',
      });
  }
  next();
};

module.exports = { dateValidation, talkValidationExists };
