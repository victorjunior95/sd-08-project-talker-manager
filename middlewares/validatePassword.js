const ERROR_STATUS = 400;

const validatePassword = (req, res, next) => {
  const { password } = req.body;
  if (!password) {
    res
      .status(ERROR_STATUS)
      .json({ message: 'O campo "password" é obrigatório' });
  }
  if (password.length < 6) {
    res
      .status(ERROR_STATUS)
      .json({ message: 'O "password" deve ter pelo menos 6 caracteres' });
  }
  next();
};

module.exports = validatePassword;
