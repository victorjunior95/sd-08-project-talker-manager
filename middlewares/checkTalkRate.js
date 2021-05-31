const MIN = 1;
const MAX = 5;

const checkTalkRate = (req, res, next) => {
  const { talk } = req.body;
  const { rate } = talk;
  if (!rate) {
    return res.status(400).json({
      message: 'O campo "talk" é obrigatório e "watchedAt" e "rate" não podem ser vazios',
    });
  }
  if (rate < MIN || rate > MAX) {
    return res.status(400).json({ message: 'O campo "rate" deve ser um inteiro de 1 à 5' });
  }
  next();
};

module.exports = checkTalkRate;
