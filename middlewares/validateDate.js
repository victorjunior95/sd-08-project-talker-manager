const validateDate = (req, res, next) => {
  const datePattern = /(\d{2}?\/\d{2}?\/\d{4}?)/g;
  const { talk } = req.body;
  if (!datePattern.test(talk.watchedAt)) {
    return res.status(400).send({ message: 'O campo "watchedAt" deve ter o formato "dd/mm/aaaa"' });
  }
  next();
};

module.exports = validateDate;