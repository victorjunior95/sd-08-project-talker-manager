const fs = require('fs');
const getTalkers = require('./services/getTalkers');

const validateName = (name, res) => {
  if (!name || name === undefined) {
    return res
      .status(400)
      .send({
        message:
         'O campo "name" é obrigatório',
      });
  }

  if (name.length < 3) {
    return res
      .status(400)
      .send({
        message:
         'O "name" deve ter pelo menos 3 caracteres', 
      });
  }
};

const validateAge = (age, res) => {
  if (!age || age === undefined) {
    return res.status(400).send({ message: 'O campo "age" é obrigatório' });
  }

  if (age < 18) {
    return res
      .status(400)
      .send({ message: 'A pessoa palestrante deve ser maior de idade' });
  }
};

const validateWatchedAt = (watchedAt, res) => {
  const dateFormatRgx = /^(0?[1-9]|[12][0-9]|3[01])[/-](0?[1-9]|1[012])[/-]\d{4}$/;

  if (!watchedAt || watchedAt === undefined) {
    return res
      .status(400)
      .send({
        message:
          'O campo "talk" é obrigatório e "watchedAt" e "rate" não podem ser vazios',
      });
  }
  if (!dateFormatRgx.test(watchedAt)) {
    return res
      .status(400)
      .send({ 
        message:
         'O campo "watchedAt" deve ter o formato "dd/mm/aaaa"',
      });
  }
};

const validateRate = (rate, res) => {
  if (!rate || rate === undefined) {
    return res
      .status(400)
      .send({
        message: 
          'O campo "talk" é obrigatório e "watchedAt" e "rate" não podem ser vazios',
      });
  }

  if (rate < 1 || rate > 5) {
    return res
      .status(400)
      .send({ message: 'O campo "rate" deve ser um inteiro de 1 à 5' });
  }
};

const validateTalk = (talk, res) => {
  if (!talk) {
    return res.status(400).send({
      message:
        'O campo "talk" é obrigatório e "watchedAt" e "rate" não podem ser vazios',
    });
  }

  const { watchedAt, rate } = talk;

  validateWatchedAt(watchedAt, res);

  validateRate(rate, res);
};

const createTalker = (newTalker) => {
  const currTalkers = getTalkers();
  const talker = newTalker;
  talker.id = (currTalkers[currTalkers.length - 1].id) + 1;
  currTalkers.push(talker);
  console.log(talker);
  const talkerReady = JSON.stringify(currTalkers);
  fs.writeFileSync('./talker.json', talkerReady, 'utf-8');
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
