const messages = {
  dateIncorrect: 'O campo "watchedAt" deve ter o formato "dd/mm/aaaa"',
  rateNotInteger: 'O campo "rate" deve ser um inteiro de 1 à 5',
  talkRequire: 'O campo "talk" é obrigatório e "watchedAt" e "rate" não podem ser vazios',
};

// https://stackoverflow.com/questions/10194464/javascript-dd-mm-yyyy-date-check
const dateValidation = (date) => {
  const regex = /(0[1-9]|[12][0-9]|3[01])[- /.](0[1-9]|1[012])[- /.](19|20)\d\d/;
  return regex.test(date);
};

module.exports = (req, res, next) => {
  const { talk } = req.body;
  if (!dateValidation(talk.watchedAt)) {
    return res.status(400).json({ message: messages.dateIncorrect });
  }
  if (Number.isInteger(talk.rate) === false || talk.rate < 1 || talk.rate > 5) {
    return res.status(400).json({ message: messages.rateNotInteger });
  }
  next();
};
