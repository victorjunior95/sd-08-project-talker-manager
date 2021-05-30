const crypto = require('crypto');

const BAD_REQUEST_STATUS = 400;
const UNAUTHORIZED_STATUS = 401;

const validateEmail = (email) => {
  const regexEmail = /[a-zA-Z0-9_]+@[a-zA-Z0-9_]+\.com/;
  return regexEmail.test(email);
};

const validatePassword = (password) => password.length >= 6;

const validateName = (name) => name.length >= 3;

const validateAge = (age) => age >= 18;

const validateDate = (date) => {
  const regexDate = /(0[1-9]|[1-2][0-9]|3[0-1])\/(0[1-9]|1[0-2])\/[0-9]{4}/;
  return regexDate.test(date);
};

const validateRate = (rate) => rate >= 1 && rate <= 5;

const validateToken = (token) => token.length === 16;

const generateToken = () => {
  const secret = 'johnLindao';
  const token = crypto
    .createHash('sha256', secret)
    .digest('hex')
    .slice(0, 16);
  
  return token;
};

const tokenMiddleware = (req, res, next) => {
  const { authorization } = req.headers;
  if (!authorization) {
    return res.status(UNAUTHORIZED_STATUS).json(
      { message: 'Token não encontrado' },
    );
  }
  const isTokenValid = validateToken(authorization);
  if (!isTokenValid) return res.status(UNAUTHORIZED_STATUS).json({ message: 'Token inválido' });
  next();
};

const nameMiddleware = (req, res, next) => {
  const { name } = req.body;
  const noNameMsg = 'O campo "name" é obrigatório';
  if (!name) return res.status(BAD_REQUEST_STATUS).json({ message: noNameMsg });
  const isNameValid = validateName(name);
  const invalidNameMsg = 'O "name" deve ter pelo menos 3 caracteres';
  if (!isNameValid) return res.status(BAD_REQUEST_STATUS).json({ message: invalidNameMsg });
  next();
};

const ageMiddleware = (req, res, next) => {
  const { age } = req.body;
  const invalidTokenMsg = 'O campo "age" é obrigatório';
  if (!age) return res.status(BAD_REQUEST_STATUS).json({ message: invalidTokenMsg });
  const isAgeValid = validateAge(age);
  const invalidAgeMsg = 'A pessoa palestrante deve ser maior de idade';
  if (!isAgeValid) return res.status(BAD_REQUEST_STATUS).json({ message: invalidAgeMsg });
  next();
};

const isTalkInvalid = (talk) => !talk || !talk.watchedAt || (!talk.rate && talk.rate !== 0);

const talkMiddleware = (req, res, next) => {
  const { talk } = req.body;
  const invalidTalk = 'O campo "talk" é obrigatório e "watchedAt" e "rate" não podem ser vazios';
  if (isTalkInvalid(talk)) res.status(BAD_REQUEST_STATUS).json({ message: invalidTalk });
  const invalidDateMsg = 'O campo "watchedAt" deve ter o formato "dd/mm/aaaa"';
  const isDateValid = validateDate(talk.watchedAt);
  if (!isDateValid) return res.status(BAD_REQUEST_STATUS).json({ message: invalidDateMsg });
  const invalidRateMsg = 'O campo "rate" deve ser um inteiro de 1 à 5';
  const isValidRate = validateRate(talk.rate);
  if (!isValidRate) return res.status(BAD_REQUEST_STATUS).json({ message: invalidRateMsg });
  next();
};

module.exports = {
  validateEmail,
  validatePassword,
  validateName,
  validateAge,
  validateDate,
  validateRate,
  validateToken,
  generateToken,
  tokenMiddleware,
  nameMiddleware,
  ageMiddleware,
  talkMiddleware,
};
