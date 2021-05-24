// Date validation:

const checkExistence = (watchedAt, rate, res) => {
  if (!watchedAt || !rate) {
    res.status(400).send({
      message: 'O campo "talk" é obrigatório e "watchedAt" e "rate" não podem ser vazios',
    });
    return false;
  }
  return true;
};

function isValidDate(dateString) {
  if (!/^\d{1,2}\/\d{1,2}\/\d{4}$/.test(dateString)) return false;

  const dateArray = dateString.split('/');
  const rearrangedDate = `${dateArray[2]}-${dateArray[1]}-${dateArray[0]}`;

  return !Number.isNaN(Date.parse(rearrangedDate));
}

const checkWatchedAt = (watchedAt, res) => {
  if (!isValidDate(watchedAt)) {
    res.status(400).send({ message: 'O campo "watchedAt" deve ter o formato "dd/mm/aaaa"' });
    return false;
  }
  return true;
};

const checkRate = (rate, res) => {
  if (!Number.isInteger(rate) || rate < 1 || rate > 5) {
    res.status(400).send({ message: 'O campo "rate" deve ser um inteiro de 1 à 5' });
    return false;
  }
  return true;
};

const checkTalk = (talk, res) => {
  const { watchedAt, rate } = talk || { watchedAt: '', rate: '' };

  const exists = checkExistence(watchedAt, rate, res);
  const dateIsCorrect = exists ? checkWatchedAt(watchedAt, res) : false;
  if (dateIsCorrect) return checkRate(rate, res);
};

module.exports = checkTalk;
