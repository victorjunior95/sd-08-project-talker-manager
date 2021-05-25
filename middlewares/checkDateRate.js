  module.exports = (req, res, next) => {
  const { talk } = req.body;
  const regEx = /^[0-9]{2}\/[0-9]{2}\/[0-9]{4}$/;
  
  if (!regEx.test(talk.watchedAt)) {
    res.status(400).json({
      message: 'O campo "watchedAt" deve ter o formato "dd/mm/aaaa"',
    });
    return;
  }

  if (talk.rate < 1 || talk.rate > 5) {
    return res.status(400).json({
      message: 'O campo "rate" deve ser um inteiro de 1 à 5',
    });
  }

  next();
};
