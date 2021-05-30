const checkTalkExistence = (req, res, next) => {
  const { watchedAt, rate } = req.body.talk || { watchedAt: '', rate: '' };

  if (!watchedAt || (!rate && rate !== 0)) {
    return res.status(400).send({
      message: 'O campo "talk" é obrigatório e "watchedAt" e "rate" não podem ser vazios',
    });
  }

  next();
};

const isValidDate = (dateString) => {
  if (!/^\d{1,2}\/\d{1,2}\/\d{4}$/.test(dateString)) return false;

  const dateArray = dateString.split('/');
  const rearrangedDate = `${dateArray[2]}-${dateArray[1]}-${dateArray[0]}`;

  return !Number.isNaN(Date.parse(rearrangedDate));
};

const checkTalkWatchedAt = (req, res, next) => {
  const { watchedAt } = req.body.talk || { watchedAt: '' };

  if (!isValidDate(watchedAt)) {
    return res.status(400).send({ message: 'O campo "watchedAt" deve ter o formato "dd/mm/aaaa"' });
  }

  next();
};

const checkTalkRate = (req, res, next) => {
  const { rate } = req.body.talk || { rate: '' };

  if (!Number.isInteger(rate) || rate < 1 || rate > 5) {
    return res.status(400).send({ message: 'O campo "rate" deve ser um inteiro de 1 à 5' });
  }

  next();
};

const checkTalk = {
  checkTalkExistence,
  checkTalkWatchedAt,
  checkTalkRate,
};

module.exports = checkTalk;
