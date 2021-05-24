const validationLogin = (req, res, next) => {
  const { email, password } = req.body;
  const EMAIL_REGEX = /^\w+@[a-zA-Z_]+?\.[a-zA-Z]{2,3}$/;

  if (!email) return res.status(400).json({ message: 'O campo "email" é obrigatório' });
  if (!EMAIL_REGEX.test(email)) {
    return res.status(400)
      .json({ message: 'O "email" deve ter o formato "email@email.com"' });
  }
  if (!password) {
 return res.status(400)
      .json({ message: 'O campo "password" é obrigatório' }); 
}
  if (password.length <= 6) {
    return res.status(400)
      .json({ message: 'O "password" deve ter pelo menos 6 caracteres' });
  }
  next();
};

const validationToken = (req, res, next) => {
  const token = req.headers.authorization;
  const TOKEN_VALIDATION = /^[0-9a-zA]{16}$/;
  if (!token) return res.status(401).json({ message: 'Token não encontrado' });
  if (!TOKEN_VALIDATION.test(token)) return res.status(401).json({ message: 'Token inválido' });
  next();
};

const validationName = (req, res, next) => {
  const { name } = req.body;
  if (!name) return res.status(400).json({ message: 'O campo "name" é obrigatório' });
  if (name.length < 3) {
    return res
      .status(400)
      .json({ message: 'O "name" deve ter pelo menos 3 caracteres' });
  }
  next();
};

const validationAge = (req, res, next) => {
  const { age } = req.body;
  if (!age) return res.status(400).json({ message: 'O campo "age" é obrigatório' });
  if (age < 18) {
    return res
      .status(400)
      .json({ message: 'A pessoa palestrante deve ser maior de idade' });
  }
  next();
};

const validationTalk = (req, res, next) => {
  const { talk } = req.body;
  if (!talk) {
    return res
      .status(400)
      .json({
        message:
          'O campo "talk" é obrigatório e "watchedAt" e "rate" não podem ser vazios',
      });
  }
  if (talk.watchedAt === undefined || talk.rate === undefined) {
    return res
      .status(400)
      .json({
        message:
        'O campo "talk" é obrigatório e "watchedAt" e "rate" não podem ser vazios',
      });
  }
  next();
};

const validationTalkFormat = (req, res, next) => {
  const { talk } = req.body;
  const DATE_REGEX = /^([0-2][1-9]|(3)[0-1])(\/)(((0)[1-9])|((1)[0-2]))(\/)\d{4}$/i;
  if (!Number.isInteger(talk.rate) || talk.rate < 1 || talk.rate > 5) {
    return res
      .status(400)
      .json({ message: 'O campo "rate" deve ser um inteiro de 1 à 5' });
  }
  if (!DATE_REGEX.test(talk.watchedAt)) {
    return res
      .status(400)
      .json({ message: 'O campo "watchedAt" deve ter o formato "dd/mm/aaaa"' });
  }
  next();
};

module.exports = {
  validationLogin,
  validationToken,
  validationName,
  validationAge,
  validationTalk,
  validationTalkFormat,
};
