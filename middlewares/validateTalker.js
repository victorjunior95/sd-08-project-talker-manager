const validateName = async (req, res, next) => {
  const { name } = req.body;

  if (!name || name === '') {
    return res.status(400)
      .json({ message: 'O campo "name" é obrigatório' });
  }

  if (name.length < 3) {
    return res.status(400)
      .json({ message: 'O "name" deve ter pelo menos 3 caracteres' });
  }

  next();
};

const validateAge = async (req, res, next) => {
  const { age } = req.body;

  if (!age || age === '') {
    return res.status(400)
      .json({ message: 'O campo "age" é obrigatório' });
  }
  
  if (age < 18) { 
    return res.status(400)
      .json({ message: 'A pessoa palestrante deve ser maior de idade' });
  }

  next();
};

const validateTalk = async (req, res, next) => {
  const { talk } = req.body;
  if (talk === undefined || !talk) {
    return res.status(400)
      .json(
        { message: 'O campo "talk" é obrigatório e "watchedAt" e "rate" não podem ser vazios' },
      );
  }

  next();
};

const verifyDate = (date) => {
  const dateRegex = /^([0-2][0-9]|(3)[0-1])(\/)(((0)[0-9])|((1)[0-2]))(\/)\d{4}$/;
  return dateRegex.test(String(date));
};

const validateWatchedAt = async (req, res, next) => {
  const { talk } = req.body;

  if (talk.watchedAt === '' || talk.watchedAt === undefined) {
    return res.status(400)
      .json(
        { message: 'O campo "talk" é obrigatório e "watchedAt" e "rate" não podem ser vazios' },
      );
  }

  if (verifyDate(talk.watchedAt) === false) {
    return res.status(400)
      .json({ message: 'O campo "watchedAt" deve ter o formato "dd/mm/aaaa"' });
  }

  next();
};

const validateRate = async (req, res, next) => {
  const { talk } = req.body;

  if (talk.rate === '' || talk.rate === undefined) {
    return res.status(400).json(
        { message: 'O campo "talk" é obrigatório e "watchedAt" e "rate" não podem ser vazios' },
      );
  }

  if (talk.rate < 1 || talk.rate > 5) {
    return res.status(400)
      .json({ message: 'O campo "rate" deve ser um inteiro de 1 à 5' });
  }

  next();
};

module.exports = {
  validateName,
  validateAge,
  validateTalk,
  validateWatchedAt,
  validateRate,
};