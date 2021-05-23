const VALID_EMAIL_REGEX = /\S+@\S+\.\S+/;
const VALID_DATE = /^(0[1-9]|[12][0-9]|3[01])[/.](0[1-9]|1[012])[/.](19|20)\d\d$/;
const BAD_REQUEST = 400;
const UNAUTHORIZED = 401;

const email = (userEmail) => {
  if (!userEmail || userEmail === '') {
    return { message: 'O campo "email" é obrigatório' };
  }
  if (!VALID_EMAIL_REGEX.test(userEmail)) {
    return { message: 'O "email" deve ter o formato "email@email.com"' };
  }
  return true;
};

const password = (userPassword) => {
  if (!userPassword || userPassword === '') {
    return { message: 'O campo "password" é obrigatório' };
  }
  if (userPassword.toString().length < 6) {
    return { message: 'O "password" deve ter pelo menos 6 caracteres' };
  }
  return true;
};

const token = (req, res, next) => {
  if (!req.headers.authorization) {
    return res.status(UNAUTHORIZED).send({ message: 'Token não encontrado' });
  }
  if (req.headers.authorization.length < 16) {
    return res.status(UNAUTHORIZED).send({ message: 'Token inválido' });
  }
  next();
};

const name = (req, res, next) => {
  if (!req.body.name) {
    return res
      .status(BAD_REQUEST)
      .send({ message: 'O campo "name" é obrigatório' });
  }
  if (req.body.name.length <= 3) {
    return res
      .status(BAD_REQUEST)
      .send({ message: 'O "name" deve ter pelo menos 3 caracteres' });
  }
  next();
};

const age = (req, res, next) => {
  if (!req.body.age) {
    return res
      .status(BAD_REQUEST)
      .send({ message: 'O campo "age" é obrigatório' });
  }
  if (req.body.age < 18) {
    return res
      .status(BAD_REQUEST)
      .send({ message: 'A pessoa palestrante deve ser maior de idade' });
  }
  next();
};

const talk = (req, res, next) => {
  // const { body } = req;
  // if (Object.keys(body).includes('talk')) {
  //   next();
  // }
  if (
    !req.body.talk
      || typeof req.body.talk.rate !== 'number'
      || typeof req.body.talk.watchedAt !== 'string'
  ) {
    res.status(BAD_REQUEST).send({
      message:
        'O campo "talk" é obrigatório e "watchedAt" e "rate" não podem ser vazios',
    });
  }
  next();
};

const rate = (req, res, next) => {
  if (req.body.talk.rate < 1 || req.body.talk.rate > 5) {
    res
      .status(BAD_REQUEST)
      .send({ message: 'O campo "rate" deve ser um inteiro de 1 à 5' });
  }
  next();
};

const watchedAt = (req, res, next) => {
  if (!VALID_DATE.test(req.body.talk.watchedAt)) {
    res.status(BAD_REQUEST).send({
      message: 'O campo "watchedAt" deve ter o formato "dd/mm/aaaa"',
    });
  }
  next();
};

// const rate = (req, res, next) => {
//   if (req.body.talk.rate < 1 || req.body.talk.rate > 5) {
//     res
//       .status(BAD_REQUEST)
//       .send({ message: 'O campo "rate" deve ser um inteiro de 1 à 5' });
//   }
//   next();
// };

const validate = {
  email,
  password,
  token,
  name,
  age,
  talk,
  watchedAt,
  rate,
};

module.exports = validate;
