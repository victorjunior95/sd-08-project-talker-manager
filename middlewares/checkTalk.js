const FALTA_DADOS = 400;

const checkTalk = (req, resp, next) => {
  const { talk } = req.body;
  if (!talk || !talk.watchedAt || talk.rate === undefined) {
    return resp.status(FALTA_DADOS).send({
      message: 'O campo "talk" é obrigatório e "watchedAt" e "rate" não podem ser vazios',
      });
  }
  next();
}; 

module.exports = checkTalk;
