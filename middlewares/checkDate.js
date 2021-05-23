const checkDate = (req, res, next) => {
  const rx = /[0-9]{2}\/[0-9]{2}\/[0-9]{4}/g;
  if (!rx.test(req.body.talk.watchedAt)) {
    return res.status(400)
    .json({ message: 'O campo "watchedAt" deve ter o formato "dd/mm/aaaa"' });
  }
  if (Number.isInteger(req.body.talk.rate) 
  && req.body.talk.rate >= 1 && req.body.talk.rate <= 5) {
    return next();
  } 
    return res.status(400).json({ message: 'O campo "rate" deve ser um inteiro de 1 à 5' });
};
module.exports = checkDate;