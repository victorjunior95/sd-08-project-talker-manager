const FAILD_AGE_STATUS = 400;

const validateName = (req, res, next) => {
  const { age } = req.body;
  if (!age) {
    return res
      .status(FAILD_AGE_STATUS)
      .json({ message: 'O campo "age" é obrigatório' });
  }
  if (parseInt(age, 10) < 18) {
    return res
      .status(FAILD_AGE_STATUS)
      .json({ message: 'A pessoa palestrante deve ser maior de idade' });
  }
  next();
};

module.exports = validateName;
