function validityNameTalker(talker) {
  const { name } = talker;
  if (!name) {
    return { status: 400, message: 'O campo "name" é obrigatório' };
  } 
  if (name.length < 3) {
    return { status: 400, message: 'O "name" deve ter pelo menos 3 caracteres' };
  }
  return true;
}

function validityAgeTalker(talker) {
  const { age } = talker;
  if (!age) {
    return { status: 400, message: 'O campo "age" é obrigatório' };
  } 
  if (age < 18 || age % 1 !== 0 || typeof age !== 'number') {
    return { status: 400, message: 'A pessoa palestrante deve ser maior de idade' };
  }
  return true;
}

function validityTalk(talker) {
  if (!talker.talk || Object.keys(talker.talk).length !== 2 
    || talker.talk.watchedAt === '' || talker.talk.rate === '') {
    return {
      status: 400,
      message: 'O campo "talk" é obrigatório e "watchedAt" e "rate" não podem ser vazios',
    };
  } 
  return true;
}

function validityWatchedAtTalker(talker) {
  const { talk } = talker;
  const { watchedAt } = talk;
  const rgx = new RegExp(/^([0-2][0-9]|(3)[0-1])(\/)(((0)[0-9])|((1)[0-2]))(\/)\d{4}$/g); // https://www.regextester.com/99555
  if (!watchedAt || !watchedAt.match(rgx)) {
    return {
      status: 400,
      message: 'O campo "watchedAt" deve ter o formato "dd/mm/aaaa"' };
  }
  return true;
}

function validityRateTalker(talker) {
  const { talk } = talker;
  const { rate } = talk;
  if (typeof rate !== 'number' || Number(rate) % 1 !== 0 || Number(rate) < 1 || Number(rate) > 5) {
    return { status: 400, message: 'O campo "rate" deve ser um inteiro de 1 à 5' };
  }
  return true;
}

function validityAll(talker) {
  if (!talker.talk) {
    return [validityTalk(talker)];
  }
  const isResolve = [
    validityNameTalker,
    validityAgeTalker,
    validityTalk,
    validityWatchedAtTalker,
    validityRateTalker,
  ]; 
  return isResolve.map((el) => el(talker));
}

module.exports = validityAll;
