// tive ajuda para fazer minhas validações pois elas não passavam no teste, ediberto e Bruno me ajudaram;

function validationToken(authorization) { 
  if (!authorization) throw new Error('Token não encontrado');
  if (authorization.length < 16) throw new Error('Token inválido');
}

function validationName(name) {
  if (!name) throw new Error('O campo "name" é obrigatório');
  if (name.length < 3) throw new Error('O "name" deve ter pelo menos 3 caracteres');
}

function validationAge(age) {
  if (!age) throw new Error('O campo "age" é obrigatório');
  if (age < 18) throw new Error('A pessoa palestrante deve ser maior de idade');
}

function validationTalk(req) {
  if (!req.body.talk) {
    throw new Error('O campo "talk" é obrigatório e "watchedAt" e "rate" não podem ser vazios'); 
  }
}

function validationRate(talk) {
  if (!talk.rate) {
    throw new Error('O campo "talk" é obrigatório e "watchedAt" e "rate" não podem ser vazios'); 
}
}

function validationWatchedAt(talk) {
  if (!talk.watchedAt) {
    throw new Error('O campo "talk" é obrigatório e "watchedAt" e "rate" não podem ser vazios');
  }
}

function validationWatchedRate(talk) {
  const { watchedAt, rate } = talk;
  const re = /^(0?[1-9]|[12][0-9]|3[01])[/-](0?[1-9]|1[012])[/-]\d{4}$/; // https://stackoverflow.com/questions/5465375/javascript-date-regex-dd-mm-yyyy
  if (!re.test(watchedAt)) {
    throw new Error('O campo "watchedAt" deve ter o formato "dd/mm/aaaa"');
  }
  if (rate < 1 || rate > 5) {
    throw new Error('O campo "rate" deve ser um inteiro de 1 à 5');
  }
}

function allValidation(req) {
  const { authorization } = req.headers;
  const { name, age, talk } = req.body;
  validationToken(authorization);
  validationName(name);
  validationAge(age);
  validationTalk(req);
  validationWatchedAt(talk);
  validationWatchedRate(talk);
  validationRate(talk);
}

module.exports = { validationToken, allValidation }; 