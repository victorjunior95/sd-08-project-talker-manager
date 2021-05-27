const verificarCampoTalk = (req, res, next) => {
  const { talk } = req.body;
  const { watchedAt, rate } = req.body.talk;
  
  if (!talk) {
    return res.status(400)
    .send({ message: 'O campo "talk" é obrigatório e "watchedAt" e "rate" não podem ser vazios' });
  }
  if (rate === undefined || watchedAt === undefined) {
    return res.status(400)
    .send({ message: 'O campo "talk" é obrigatório e "watchedAt" e "rate" não podem ser vazios' });
  }
  next();
};

module.exports = verificarCampoTalk;
