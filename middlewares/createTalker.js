const validateDate = require('validate-date');
// https://www.npmjs.com/package/validate-date
// const fs = require('fs');
const talkers = require('../talker.json');

const verifyName = (name) => {
  if (name === undefined || name.length === 0) return 'O campo "name" é obrigatório';
  if (name.length < 3) return 'O "name" deve ter pelo menos 3 caracteres';
  return '';
};

const verifyAge = (age) => {
  if (age === undefined) return 'O campo "age" é obrigatório';
  if (age < 18) return 'A pessoa palestrante deve ser maior de idade';
  return '';
};

const isTalkEmpty = (talk) => {
  if (talk === undefined || talk.watchedAt === undefined || talk.rate === undefined) {
    return true;
  }
  return false;
};

const verifyTalk = (talk) => {
  const isEmpty = isTalkEmpty(talk);
  if (isEmpty) {
    return 'O campo "talk" é obrigatório e "watchedAt" e "rate" não podem ser vazios';
  }
  const date = validateDate(talk.watchedAt, 'boolean', 'dd/mm/yyyy');
  if (!date) return 'O campo "watchedAt" deve ter o formato "dd/mm/aaaa"';
  if (talk.rate < 1 || talk.rate > 5) return 'O campo "rate" deve ser um inteiro de 1 à 5';
  return '';
};

module.exports = (req, res) => {
  const { name } = req.body;
  const { age } = req.body;
  const { talk } = req.body;
  const nameValid = verifyName(name);
  const ageValid = verifyAge(age);
  const talkValid = verifyTalk(talk);
  if (nameValid.length !== 0) return res.status(400).json({ message: nameValid });
  if (ageValid.length !== 0) return res.status(400).json({ message: ageValid });
  if (talkValid.length !== 0) return res.status(400).json({ message: talkValid });
  talkers.push({
    name,
    age,
    talk,
    id: talkers.length + 1,
  });
  // fs.writeFileSync('../talker.json', JSON.stringify(talkers));
  res.status(201).json(talkers[talkers.length - 1]);
};
