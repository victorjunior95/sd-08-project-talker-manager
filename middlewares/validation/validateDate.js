const datesRegex = /\d{2}\/\d{2}\/\d{4}/;
module.exports = (req, res, next) => {
  const { talk } = req.body;

  if (!talk.watchedAt.match(datesRegex)) {
    return res.status(400).json({
      message: 'O campo "watchedAt" deve ter o formato "dd/mm/aaaa"',
    });
  }
  next();
};
