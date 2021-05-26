  const validationToken = (req, res, next) => {
  const tokenHeader = req.headers.authorization;
  const tokenRegexValidation = /^(\d|\w){16}$/gm.test(tokenHeader);
  if (!tokenHeader) {
    res.status(401).json({ message: 'Token não encontrado' });
  }
  if (!tokenRegexValidation) {
    res.status(401).json({ message: 'Token inválido' });
  }
  next();
};

const validationName = (req, res, next) => {
  const { name } = req.body;
  if (!name) {
    res.status(400).json({ message: 'O campo "name" é obrigatório' });
  }
  if (name.length < 3) {
    res.status(400).json({ message: 'O "name" deve ter pelo menos 3 caracteres' });
  }
  next();
};

const validationAge = (req, res, next) => {
  const { age } = req.body;
  if (!age) {
    res.status(400).json({ message: 'O campo "age" é obrigatório' });
  }
  if (age < 18) {
    res.status(400).json({ message: 'A pessoa palestrante deve ser maior de idade' });
  }
  next();
};

function validationTalk(req, res, next) {
  const { talk } = req.body;
  if (!talk) {
    res.status(400)
    .json({ message: 'O campo "talk" é obrigatório e "watchedAt" e "rate" não podem ser vazios' });
  }
  if (talk.rate === undefined || talk.watchedAt === undefined) {
    res.status(400)
    .json({ message: 'O campo "talk" é obrigatório e "watchedAt" e "rate" não podem ser vazios' });
  }
  next();
}

// referencia de regex - StackOverFlow https://stackoverflow.com/questions/29625322/validate-dateformat-in-dd-mm-yyyy-using-regex?noredirect=1&lq=1
const validationRateAndDate = (req, res, next) => {
  const {
    body: {
      talk: { rate, watchedAt },
    },
  } = req;
  if (rate > 5 || rate < 1) {
    res.status(400).json({ message: 'O campo "rate" deve ser um inteiro de 1 à 5' });
  }
  if (!/^[0-9]{2}\/[0-9]{2}\/[0-9]{4}$/.test(watchedAt)) {
    res.status(400).json({ message: 'O campo "watchedAt" deve ter o formato "dd/mm/aaaa"' });
  }
  next();
};

module.exports = {
  validationToken,
  validationName,
  validationAge,
  validationTalk,
  validationRateAndDate,
};