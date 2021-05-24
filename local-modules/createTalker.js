const fs = require('fs');
const { checkAuth, checkName, checkAge, checkTalk } = require('./validity-checks');

const writeTalker = (newTalker, res) => {
  try {
    const allTalkers = JSON.parse(fs.readFileSync('talker.json'));
    const id = allTalkers.reduce((acc, val) => (acc.id > val.id ? acc.id : val.id)) + 1;

    allTalkers.push({ id, ...newTalker });
    fs.writeFileSync('talker.json', JSON.stringify(allTalkers));

    res.status(201).send({ id, ...newTalker });
  } catch (err) {
    console.error(err);
  }
};

const createTalker = async (req, res) => {
  const { authorization } = req.headers;
  const { name, age, talk } = req.body;

  const authPassed = checkAuth(authorization, res);
  const namePassed = authPassed ? checkName(name, res) : false;
  const agePassed = namePassed ? checkAge(age, res) : false;
  const talkPassed = agePassed ? checkTalk(talk, res) : false;

  if (talkPassed) writeTalker(req.body, res);
};

module.exports = createTalker;
