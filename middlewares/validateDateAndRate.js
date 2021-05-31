module.exports = (req, res, next) => {
  const { watchedAt, rate } = req.body.talk;
  const regexDate = /^[0-9]{2}\/[0-9]{2}\/[0-9]{4}$/;
  const dateIsValid = regexDate.test(watchedAt);
  if (rate < 1 || rate > 5) {
    res.status(400).json({ message: 'O campo "rate" deve ser um inteiro de 1 à 5' });
  }
  if (!dateIsValid) {
    res.status(400).json({ message: 'O campo "watchedAt" deve ter o formato "dd/mm/aaaa"' });
  }
  // if (!rate) {
  //   res.status(400)
  //   .json({ message: 'O campo "talk" é obrigatório e "watchedAt" e "rate" não podem ser vazios' });
  // }
  next();
};