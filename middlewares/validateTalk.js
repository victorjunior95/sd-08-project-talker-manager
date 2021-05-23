const FAILD_TALK_STATUS = 400;

const validDateFormate = /^[0-9]{2}\/[0-9]{2}\/[0-9]{4}$/;

const isAnyFieldEmpty = (talk) => {
  if (!talk) return true;
  const { watchedAt, rate } = talk;
  if (!watchedAt || (!rate && rate !== 0)) return true;
  return false;
};

const validateName = (req, res, next) => {
  const { talk } = req.body;
  if (isAnyFieldEmpty(talk)) {
    return res.status(FAILD_TALK_STATUS).json({
      message:
        'O campo "talk" é obrigatório e "watchedAt" e "rate" não podem ser vazios',
    });
  }
  const { watchedAt } = talk;
  if (!validDateFormate.test(watchedAt)) {
    return res
      .status(FAILD_TALK_STATUS)
      .json({ message: 'O campo "watchedAt" deve ter o formato "dd/mm/aaaa"' });
  }
  next();
};

module.exports = validateName;
