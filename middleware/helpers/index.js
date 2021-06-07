const regexDate = /^(0[1-9]|[12][0-9]|3[01])[/](0[1-9]|1[012])[/](19|20)\d\d$/;

function isBetween(value, min, max) {
  if (Number(value) < min || Number(value) > max) return true;
  return false;
}

function fieldIsEmpty(itemOne, itemTwo = null) {
  const fieldOne = itemTwo !== null ? itemTwo : 'CHECKED';
  const fieldTwo = itemOne === 0 ? 'CHECKED' : itemOne;
  if (!fieldOne || !fieldTwo) return true;
  return false;
}

function checkAge(age) {
  if (!Number.isInteger(Number(age)) || !age) return 'NOT OK';
  if (Number(age) < 18) return true;

  return false;
}

function validateAuthAndName(name, authorization) {
  if (!authorization) return { code: 401, message: 'Token não encontrado' };
  if (authorization.length < 16) return { code: 401, message: 'Token inválido' };
  if (fieldIsEmpty(name)) return { code: 400, message: 'O campo "name" é obrigatório' }; 
  if (name.length < 3) {
  return { code: 400, message: 'O "name" deve ter pelo menos 3 caracteres' };
}
return {};
}

function validateAge(age) {
  if (checkAge(age) === 'NOT OK') return { message: 'O campo "age" é obrigatório' };
  if (checkAge(age)) {
  return { message: 'A pessoa palestrante deve ser maior de idade' }; 
}

return {};
}

function testRegex(talk) {
  if (!regexDate.test(talk.watchedAt)) {
    return { message: 'O campo "watchedAt" deve ter o formato "dd/mm/aaaa"' };
  }
  if (isBetween(talk.rate, 1, 5)) {
    return { message: 'O campo "rate" deve ser um inteiro de 1 à 5' };
  }

  return {};
}

function validateRateAndDate(talk) {
  if (!talk || !talk.watchedAt || fieldIsEmpty(Number(talk.rate), talk.watchedAt)) {
    return { message: 'O campo "talk" é obrigatório e "watchedAt" e "rate" não podem ser vazios' };
  }
  const test = testRegex(talk);
  if (test.message) return { message: test.message };
  
  return {};
}

function filterTalkers(talkers, id) {
  return talkers.filter((talker) => talker.id !== Number(id));
}

module.exports = {
  validateAuthAndName,
  validateAge,
  validateRateAndDate,
  filterTalkers,
};
