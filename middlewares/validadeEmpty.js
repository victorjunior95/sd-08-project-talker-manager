const validateEmpty = (req, res, next) => {
  const { talk } = req.body;
  if (!talk.rate
    || talk.rate === ''
    || !talk.watchedAt
    || talk.watchedAt === '') {
    return res.send(400).send({
      message: 'O campo "talk" é obrigatório e "watchedAt" e "rate" não podem ser vazios',
    });
  }
  next();
};

module.exports = validateEmpty;