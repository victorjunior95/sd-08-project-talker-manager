const HTTP_UNAUTHORIZED_STATUS = 401;
const HTTP_BAD_REQUEST_STATUS = 400;

const tokenVerification = (req, res, next) => {
  const { authorization } = req.headers;
  const tokenValidation = /^[0-9a-zA-Z]{16}$/;
  if (!authorization) {
    return res.status(HTTP_UNAUTHORIZED_STATUS).json({ message: 'Token não encontrado' });
  }
  if (!tokenValidation.test(authorization)) {
    return res.status(HTTP_UNAUTHORIZED_STATUS).json({ message: 'Token inválido' });
  }
  next();
};

const nameVerification = (req, res, next) => {
  const { name } = req.body;
  if (!name) {
    return res.status(HTTP_BAD_REQUEST_STATUS).json({ message: 'O campo "name" é obrigatório' });
  }
  if (name.length < 3) {
    return res.status(HTTP_BAD_REQUEST_STATUS)
      .json({ message: 'O "name" deve ter pelo menos 3 caracteres' });
  }
  next();
};

const ageVerification = (req, res, next) => {
  const { age } = req.body;
  if (!age) {
    return res.status(HTTP_BAD_REQUEST_STATUS).json({ message: 'O campo "age" é obrigatório' });
  }
  if (!Number.isInteger(age)) {
    return res.status(HTTP_BAD_REQUEST_STATUS)
      .json({ message: 'A idade da pessoa palestrante deve ser um número inteiro' });
  }
  if (age < 18) {
    return res.status(HTTP_BAD_REQUEST_STATUS)
      .json({ message: 'A pessoa palestrante deve ser maior de idade' });
  }
  next();
};

const msgTalk = {
  message: 'O campo "talk" é obrigatório e "watchedAt" e "rate" não podem ser vazios',
};

const talkVerification = (req, res, next) => {
  const intervalNumbers = /^([1-5])$/;
  if (Number.isInteger(req.body.talk.rate)
    && !intervalNumbers.test(req.body.talk.rate)) {
      return res.status(HTTP_BAD_REQUEST_STATUS)
        .json({ message: 'O campo "rate" deve ser um inteiro de 1 à 5' });
  }
  const formatDate = /^(0?[1-9]|[12][0-9]|3[01])[/-](0?[1-9]|1[012])[/-]\d{4}$/;
  if (!formatDate.test(req.body.talk.watchedAt)) {
    return res.status(HTTP_BAD_REQUEST_STATUS)
      .json({ message: 'O campo "watchedAt" deve ter o formato "dd/mm/aaaa"' });
  }
  next();
};

const rateAndWatchedAtVerification = (req, res, next) => {
  if (req.body.talk === undefined) {
    return res.status(HTTP_BAD_REQUEST_STATUS)
    .json(msgTalk);
  }
  if (req.body.talk.watchedAt === undefined || req.body.talk.rate === undefined) {
    return res.status(HTTP_BAD_REQUEST_STATUS)
      .json(msgTalk);
  }
  next();
};

const emailValidation = (req, res, next) => {
  const { email } = req.body;
    const validationEmail = /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/;
    if (!email) {
      return res.status(HTTP_BAD_REQUEST_STATUS).json({ message: 'O campo "email" é obrigatório' });
    }
    if (!validationEmail.test(email)) {
      return res.status(HTTP_BAD_REQUEST_STATUS)
        .json({ message: 'O "email" deve ter o formato "email@email.com"' });
    }
  next();
};

module.exports = {
  tokenVerification,
  nameVerification,
  ageVerification,
  rateAndWatchedAtVerification,
  talkVerification,
  emailValidation,
};
