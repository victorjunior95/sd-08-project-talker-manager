const {
  checkToken,
  checkName,
  checkAge,
  checkTalk,
  checkTalWatchedAt,
  checkTalkRate, } = require('../helpers');

module.exports = (request, response, next) => {
  const token = request.headers.authorization;
  const { name, talk } = request.body;
  const { watchedAt, rate } = talk;
  checkToken();
  checkName();
  checkAge();
  checkTalk();
  checkTalWatchedAt();
  checkTalkRate();
  next();
};
