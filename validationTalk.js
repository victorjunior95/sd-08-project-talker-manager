const dataValidate = (req, res, next) => {
  const {
    body: { talk },
  } = req;
  if (!talk) {
    return res.status(400).send({
      message:
        'O campo "talk" é obrigatório e "watchedAt" e "rate" não podem ser vazios',
    });
  }
  if (talk.rate === undefined || talk.watchedAt === undefined) {
    return res.status(400).send({
      message:
        'O campo "talk" é obrigatório e "watchedAt" e "rate" não podem ser vazios',
    });
  }
  next();
};
const fieldsValidate = (req, res, next) => {
  const {
    body: {
      talk: { rate, watchedAt },
    },
  } = req;
  if (!Number.isInteger(rate) || rate < 1 || rate > 5) {
    return res
      .status(400)
      .send({ message: 'O campo "rate" deve ser um inteiro de 1 à 5' });
  }
  if (!/^\d\d\/\d\d\/\d\d\d\d$/.test(watchedAt)) {
    return res
      .status(400)
      .send({ message: 'O campo "watchedAt" deve ter o formato "dd/mm/aaaa"' });
  }
  next();
};

module.exports = { fieldsValidate, dataValidate };
