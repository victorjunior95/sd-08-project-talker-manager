const messages = {
  dateIncorrect: 'O campo "watchedAt" deve ter o formato "dd/mm/aaaa"',
  rateNotInteger: 'O campo "rate" deve ser um inteiro de 1 à 5',
  talkRequire: 'O campo "talk" é obrigatório e "watchedAt" e "rate" não podem ser vazios',
};

module.exports = (req, res, next) => {
  const { talk } = req.body;
  if (talk === undefined || talk.toString().length === 0
    || talk.watchedAt === undefined || talk.rate === undefined) {
    return res.status(400).json({ message: messages.talkRequire });
  }
  next();
};
