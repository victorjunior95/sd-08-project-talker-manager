const validateWatchedAt = (watchedAt) => {
  const watchedAtRegEx = /\d{2}\/\d{2}\/\d{4}/g;
  if (!watchedAt.match(watchedAtRegEx)) return false;
  return true;
};

const validateRate = (rate) => {
  if (Number.isInteger(rate) && rate >= 1 && rate <= 5) return true;
  return false;
};

const validateFilledFields = (talk) => {
  const { watchedAt, rate } = talk;
  if (!talk || watchedAt === undefined || rate === undefined) return false;
  return true;
};

const validateTalk = (req, res, next) => {
  const { talk } = req.body;
  const { watchedAt, rate } = talk;
  if (!validateFilledFields(talk)) {
    return res.status(400).json({
      message: 'O campo "talk" é obrigatório e "watchedAt" e "rate" não podem ser vazios',
    });
  }
  if (!validateWatchedAt(watchedAt)) {
    return res.status(400).json({ message: 'O campo "watchedAt" deve ter o formato "dd/mm/aaaa"' });
  }
  if (!validateRate(rate)) {
    return res.status(400).json({ message: 'O campo "rate" deve ser um inteiro de 1 à 5' });
  }
  next();
};

module.exports = validateTalk;
