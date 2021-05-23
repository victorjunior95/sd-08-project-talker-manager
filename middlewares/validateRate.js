const FAILD_TALK_STATUS = 400;

const validateName = (req, res, next) => {
  const {
    talk: { rate },
  } = req.body;
  if (!Number.isInteger(rate) || rate < 1 || rate > 5) {
    return res
      .status(FAILD_TALK_STATUS)
      .json({ message: 'O campo "rate" deve ser um inteiro de 1 à 5' });
  }
  next();
};

module.exports = validateName;
