module.exports = (req, res, next) => {
  const { talk } = req.body;
  if (
    !talk
      || typeof talk.rate !== 'number'
      || typeof talk.watchedAt !== 'string'
  ) {
    return res.status(400).send({
      message:
        'O campo "talk" é obrigatório e "watchedAt" e "rate" não podem ser vazios',
    });
  }
  next();
};