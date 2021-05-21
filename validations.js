const validateLogin = (req, res, next) => {
  const { body } = req;
  const { email, password } = body;
  const EMAIL_VALIDATION = /^[\w]+@([\w]+\.)+[\w]{2,4}$/gi;

  if (!email) return res.status(400).send({ message: 'O campo "email" é obrigatório' });
  if (!EMAIL_VALIDATION.test(email)) {
    return res
      .status(400)
      .send({ message: 'O "email" deve ter o formato "email@email.com"' });
  }
  if (!password) return res.status(400).send({ message: 'O campo "password" é obrigatório' });
  if (password.length <= 6) {
    return res
      .status(400)
      .send({ message: 'O "password" deve ter pelo menos 6 caracteres' });
  }
  next();
};

const validateToken = (req, res, next) => {
  const auth = req.headers.authorization;
  const AUTH_VALIDATION = /^[0-9a-zA-Z]{16}$/;
  if (!auth) res.status(401).send({ message: 'Token não encontrado' });
  if (!AUTH_VALIDATION.test(auth)) res.status(401).send({ message: 'Token inválido' });
  next();
};

const validateNameAge = (req, res, next) => {
  const {
    body: { name, age },
  } = req;
  if (!name) return res.status(400).send({ message: 'O campo "name" é obrigatório' });
  if (name.length < 3) {
    return res.status(400).send({ message: 'O "name" deve ter pelo menos 3 caracteres' });
  }
  if (!age) return res.status(400).send({ message: 'O campo "age" é obrigatório' });
  if (age < 18) {
    return res
      .status(400)
      .send({ message: 'A pessoa palestrante deve ser maior de idade' });
  }
  next();
};

const validateTalkData = (req, res, next) => {
  const {
    body: { talk },
  } = req;
  if (!talk) {
    return res.status(400).send({
      message: 'O campo "talk" é obrigatório e "watchedAt" e "rate" não podem ser vazios',
    });
  }
  if (talk.rate === undefined || talk.watchedAt === undefined) {
    return res.status(400).send({
      message: 'O campo "talk" é obrigatório e "watchedAt" e "rate" não podem ser vazios',
    });
  }
  next();
};

const validateTalkInfo = (req, res, next) => {
  const {
    body: { talk: { rate, watchedAt } },
  } = req;
  if (!Number.isInteger(rate) || rate < 1 || rate > 5) {
    return res
      .status(400)
      .send({ message: 'O campo "rate" deve ser um inteiro de 1 à 5' });
  }
  if (!/^\d\d\/\d\d\/\d\d\d\d$/.test(watchedAt)) {
    return res
      .status(400)
      .send({ message: 'O campo "watchedAt" deve ter o formato "dd/mm/aaaa"' });
  }
  next();
};

module.exports = {
  validateLogin,
  validateToken,
  validateNameAge,
  validateTalkData,
  validateTalkInfo,
};
