const validateToken = (token) => {
  if (!token) {
    return {
      status: 401,
      message: 'Token não encontrado',
    };
  }
  const regex = /[0-9a-zA-Z]{16}/;
  if (!token.match(regex)) {
    return {
      status: 401,
      message: 'Token inválido',
    };
  }
  return null;
};

const validateTalkerName = (name) => {
  if (!name || name.length === 0) {
    return {
      status: 400,
      message: 'O campo "name" é obrigatório',
    };
  }
  if (name.length < 3) {
    return {
      status: 400,
      message: 'O "name" deve ter pelo menos 3 caracteres',
    };
  }
  return null;
};

const validateTalkerAge = (age) => {
  if (!age || age.length === 0) {
    return {
      status: 400,
      message: 'O campo "age" é obrigatório',
    };
  }
  if (!parseInt(age, 10) || parseInt(age, 10) < 18) {
    return {
      status: 400,
      message: 'A pessoa palestrante deve ser maior de idade',
    };
  }
  return null;
};

const validateTalkInfo = (talk) => {
  const dateRegex = /([0-2][1-9]|10|20|30|31)\/(0[1-9]|1[0-2])\/[0-9]{4}/;
  if (!talk.watchedAt.match(dateRegex)) {
    return {
      status: 400,
      message: 'O campo "watchedAt" deve ter o formato "dd/mm/aaaa"',
    };
  }
  if (!parseInt(talk.rate, 10)
    || parseInt(talk.rate, 10) < 1
    || parseInt(talk.rate, 10) > 6) {
      return {
        status: 400,
        message: 'O campo "rate" deve ser um inteiro de 1 à 5',
      };
  }
  return null;
};

const validateTalk = (talk) => {
  if (!talk
    || Object.keys(talk).length === 0
    || !talk.watchedAt
    || !talk.rate) {
      return {
        status: 400,
        message: 'O campo "talk" é obrigatório e "watchedAt" e "rate" não podem ser vazios',
      };
  }
  return null;
};

module.exports = (req, res, next) => {
  const { name, age, talk } = req.body;
  const { authorization: token } = req.headers;
  const validationError = validateToken(token) 
    || validateTalkerName(name)
    || validateTalkerAge(age)
    || validateTalk(talk)
    || validateTalkInfo(talk);
  next(validationError);
};