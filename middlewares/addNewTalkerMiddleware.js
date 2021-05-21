const {
  checkToken,
  checkName,
  checkAge,
  checkTalk,
  checkTalWatchedAt,
  checkTalkRate } = require('../helpers');

const fs = require('fs').promises;
const talkersData = require('../talker.json');

module.exports = async (request, response, next) => {
  const token = request.headers.authorization;
  const { name, age, talk } = request.body;
  const { watchedAt, rate } = talk;
  const talker = request.body;
  const newTalker = {
    id: talkersData.length + 1,
    ...talker,
  };
  checkToken(token, response);
  checkName(name, response);
  checkAge(age, response);
  checkTalk(talk, response);
  checkTalWatchedAt(watchedAt, response);
  checkTalkRate(rate, response);
  talkersData.push(newTalker);
  await fs.writeFile(`${__dirname}/../talker.json`, talkersData);
  next();
};
