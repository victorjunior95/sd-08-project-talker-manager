const ERROR_STATUS = 400;

const checkEmail = (email) => {
  const re = /.+@[A-z]+[.]com/;
  const isValidEmail = re.test(email);
  if (isValidEmail) return true;
  return false;
};

const validateEmail = (req, res, next) => {
  const { email } = req.body;
  if (!email) {
    res.status(ERROR_STATUS).json({ message: 'O campo "email" é obrigatório' });
  }
  if (!checkEmail(email)) {
    res
      .status(ERROR_STATUS)
      .json({ message: 'O "email" deve ter o formato "email@email.com"' });
  }
  next();
};

module.exports = validateEmail;