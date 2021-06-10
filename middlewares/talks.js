module.exports = (req, res, next) => {
    const reqTalk = req.body.talk;
    if (
      !reqTalk
        || typeof reqTalk.rate !== 'number'
        || typeof reqTalk.watchedAt !== 'string'
    ) {
      return res.status(400).send({
        message:
          'O campo "talk" é obrigatório e "watchedAt" e "rate" não podem ser vazios',
      });
    }
    next();
};