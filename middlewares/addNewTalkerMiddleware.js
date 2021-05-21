const {
  checkToken,
  checkName,
  checkAge,
  checkTalk,
  checkTalWatchedAt,
  checkTalkRate } = require('../helpers');

module.exports = (request, response, next) => {
  const token = request.headers.authorization;
  const { name, age, talk } = request.body;
  const { watchedAt, rate } = talk;
  checkToken(token, response);
  checkName(name, response);
  checkAge(age, response);
  checkTalk(talk, response);
  checkTalWatchedAt(watchedAt, response);
  checkTalkRate(rate, response);
  next();
};
