const validade = require('../services/validate');

module.exports = (req, res, next) => {
    const verifyEmail = validade.date(req.body.talk.watchedAt);
    if (!verifyEmail) {
      return res.status(400).send({
        message: 'O campo "watchedAt" deve ter o formato "dd/mm/aaaa"',
      });
    }
    next();
  };