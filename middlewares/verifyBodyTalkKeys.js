const validateDateFormat = (date) => {
  const dateRegEx = /^[0-9]{2}\/[0-9]{2}\/[0-9]{4}$/;
  if (!date.match(dateRegEx)) return false;

  return true;
};

const verifyRate = (rate) => {
  if (Number.isInteger(rate) && rate >= 1 && rate <= 5) return true;

  return false;
};

module.exports = (req, res, next) => {
  const { talk } = req.body;

  if (!validateDateFormat(talk.watchedAt)) {
    return res.status(400).json({ message: 'O campo "watchedAt" deve ter o formato "dd/mm/aaaa"' });
  }
  if (!verifyRate(talk.rate)) {
    return res.status(400).json({ message: 'O campo "rate" deve ser um inteiro de 1 à 5' });
  }

  next();
};
