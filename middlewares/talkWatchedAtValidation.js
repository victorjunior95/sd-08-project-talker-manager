const talkWatchedAtValidation = (req, res, next) => {
  const { watchedAt } = req.body.talk;
  const dateRegex = /^\d{2}\/\d{2}\/\d{4}$/;

  if (!watchedAt.match(dateRegex)) {
    return res.status(400).json({
      message: 'O campo "watchedAt" deve ter o formato "dd/mm/aaaa"',
    });
  }

  return next();
};

module.exports = talkWatchedAtValidation;
