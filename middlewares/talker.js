const moment = require('moment');

const checkWatchedAt = (req, res, next) => {
  const { talk: { watchedAt, rate } } = req.body;
  if (!moment(watchedAt, 'DD/MM/YYYY').isValid()) {
    return res.status(400).json({ message: 'O campo "watchedAt" deve ter o formato "dd/mm/aaaa"' });
  }

  const rateNumber = parseInt(rate, 10);

  if (rate < 1 || rate > 5 || Number.isNaN(rateNumber)) {
    return res.status(400).json({ message: 'O campo "rate" deve ser um inteiro de 1 à 5' });
  }

  next();
};

const checkTalk = (req, res, next) => {
  const { talk } = req.body;
  if (!talk || talk.rate === undefined || talk.watchedAt === undefined) {
    return res.status(400).json({ 
      message: 'O campo "talk" é obrigatório e "watchedAt" e "rate" não podem ser vazios',
    });
  }

  next();
};

const checkAge = (req, res, next) => {
    const { age } = req.body;
    if (!age) {
        return res.status(400).json({ message: 'O campo "age" é obrigatório' });
    }
  
    if (age < 18) {
        return res.status(400).json({ message: 'A pessoa palestrante deve ser maior de idade' });
    }

    next();
};

const checkName = (req, res, next) => {
  const { name } = req.body;

  if (!name) {
    return res.status(400).json({ message: 'O campo "name" é obrigatório' });
  }

  if (name.length < 3) {
    return res.status(400).json({ message: 'O "name" deve ter pelo menos 3 caracteres' });
  }

  next();
};

module.exports = {
  checkName,
  checkAge,
  checkWatchedAt,
  checkTalk,
};
