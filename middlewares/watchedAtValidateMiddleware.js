const { REGEXDATE } = require('../services');

module.exports = (request, response, next) => {
  const { watchedAt } = request.body.talk;
  if (!REGEXDATE.test(watchedAt)) {
    return response.status(400)
      .json({ message: 'O campo "watchedAt" deve ter o formato "dd/mm/aaaa"' });
  }
  next();
};
