const talkValidation = (req, res, next) => {
  const { talk } = req.body;
  const dateRegex = /^\d{2}\/\d{2}\/\d{4}$/;

  if (!talk || !talk.watchedAt || !talk.rate) {
    return res.status(400).json({
      message: 'O camp "talk" é obrigatório e "watchedAt" e "rate" não podem ser vazios',
    });
  }
  if (!talk.watchedAt.match(dateRegex)) {
    return res.status(400).json({
      message: 'O campo "watchedAt" deve ter o formato "dd/mm/aaaa"',
    });
  }
  if (!(Number.isInteger(talk.rate) && talk.rate >= 1 && talk.rate <= 5)) {
    return res.status(400).json({ message: 'O campo "rate" deve ser um inteiro de 1 à 5' });
  }
  return next();
};

module.exports = talkValidation;
