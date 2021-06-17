const fs = require('fs');
const getTalkers = require('./services/getTalkers');
const { validateName, validateAge, validateTalk } = require('./middlewares/validations');

const createTalker = (newTalker) => {
  const currTalkers = getTalkers();
  const talker = newTalker;
  talker.id = (currTalkers[currTalkers.length - 1].id) + 1;
  currTalkers.push(talker);
  fs.writeFileSync('./talker.json', JSON.stringify(currTalkers), 'utf-8');
  return talker;
};

module.exports = (req, res) => {
  try {
    const newTalker = req.body;
    const { name, age, talk } = newTalker;
    validateName(name, res);
    validateAge(age, res);
    validateTalk(talk, res);

    const talker = createTalker(newTalker);

    return res.status(201).send({ ...talker });
  } catch (err) {
    res.status(500).send(err.message);
  }
};
