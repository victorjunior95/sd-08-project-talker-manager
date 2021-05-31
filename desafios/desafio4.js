const fs = require('fs').promises;
const path = require('path');

const urlGlobal = path.join(__dirname, '..', 'talker.json');

const messTalkeExists = 'O campo "talk" é obrigatório e "watchedAt" e "rate" não podem ser vazios';
const testDate = /^(\d{2})([/]?)(\d{2})\2(\d{4})$/;

const readAllTalkers = async () => {
  const read = await fs.readFile(urlGlobal, 'utf-8')
    .then((talker) => JSON.parse(talker))
    .catch((_err) => null);
  return read;
};

const writeAllTalkers = async (add) => {
  const write = await fs.writeFile(urlGlobal, add);
  return write;
};

const validationName = (name) => {
  if (!name || name === '') return { message: 'O campo "name" é obrigatório', code: 400 };

  if (name.length < 3) return { message: 'O "name" deve ter pelo menos 3 caracteres', code: 400 };
};

const validationIdade = (age) => {
  if (!age || age === '') return { message: 'O campo "age" é obrigatório', code: 400 };

  if (age < 18) {
    return {
      message: 'A pessoa palestrante deve ser maior de idade', code: 400,
    };
  }
};

const validateTalkRate = (talk) => {
  if (!talk) return { message: messTalkeExists, code: 400 };
  if (!talk.rate) return { message: messTalkeExists, code: 400 };
  if (talk.rate < 1 || talk.rate > 5) {
    return {
      message: 'O campo "rate" deve ser um inteiro de 1 à 5',
      code: 400,
    };
  }
};
const validateTalkWatchedAt = (talk) => {
  if (!talk) return { message: messTalkeExists, code: 400 };

  if (!talk.watchedAt) return { message: messTalkeExists, code: 400 };

  const dataString = talk.watchedAt;

  const test = testDate.test(dataString);

  if (!test) {
    return {
      message: 'O campo "watchedAt" deve ter o formato "dd/mm/aaaa"', code: 400,
   };
  }
};

const validateTalk = (talk) => {
  const rateIsValid = validateTalkRate(talk);
  const watvhedAtIsValid = validateTalkWatchedAt(talk);

  if (rateIsValid) return rateIsValid;
  if (watvhedAtIsValid) return watvhedAtIsValid;
};

const validationAuthorization = (authorization) => {
  if (!authorization) return { message: 'Token não encontrado', code: 401 };
  if (authorization && JSON.stringify(authorization).length < 16) {
    return { message: 'Token inválido', code: 401 };
  }
};

const verificaTodos = (name, age, talk, authorization) => {
  const authorizationIsValid = validationAuthorization(authorization);
  const nameIsValid = validationName(name);
  const ageIsValid = validationIdade(age);
  const talkIsValid = validateTalk(talk);
  
  if (authorizationIsValid) return { err: authorizationIsValid };
  if (nameIsValid) return { err: nameIsValid };
  if (ageIsValid) return { err: ageIsValid };
  if (talkIsValid) return { err: talkIsValid };
};

const addTalker = async (name, age, talk, authorization) => {
  const verificatodosIsValid = verificaTodos(name, age, talk, authorization);
  if (verificatodosIsValid) return verificatodosIsValid;

  const { watchedAt, rate } = talk;

  const all = await readAllTalkers();
  const newTalker = {
    id: all.length + 1,
    name,
    age,
    talk: {
      watchedAt,
      rate,
    },
  };
  const adiciona = JSON.stringify([...all, newTalker]);
  await writeAllTalkers(adiciona);
  return { message: newTalker, code: 201 };
};

module.exports = {
  addTalker,
};