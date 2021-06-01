const talkValidation = (req, res, next) => {
  const { talk } = req.body;

  if (!talk || !talk.watchedAt || typeof talk.rate !== 'number') {
    return res.status(400).json({
      message: 'O campo "talk" é obrigatório e "watchedAt" e "rate" não podem ser vazios',
    });
  }

  return next();
};

module.exports = talkValidation;
