module.exports = (req, res, next) => {
  const { talk } = req.body;
  const msg = { 
    message: 'O campo "talk" é obrigatório e "watchedAt" e "rate" não podem ser vazios',
  };
  if (!talk || !talk.watchedAt || typeof talk.rate !== 'number') {
  return res.status(400).send(msg);
} next();
};
