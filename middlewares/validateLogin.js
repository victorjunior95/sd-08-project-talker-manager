const validateEmail = (email) => {
  if (!email || email.length === 0) {
    return {
      status: 400,
      message: 'O campo "email" é obrigatório',
    };
  }
  const regex = /[a-zA-Z0-9._+-]{1,30}@[a-zA-Z0-9._+-]{1,10}\.com/;
  if (!email.match(regex)) {
    return {
      status: 400,
      message: 'O "email" deve ter o formato "email@email.com"',
    };
  }
  return null;
};

const validatePassword = (password) => {
  if (!password) {
    return {
      status: 400,
      message: 'O campo "password" é obrigatório',
    };
  }
  if (password.length < 6) {
    return {
      status: 400,
      message: 'O "password" deve ter pelo menos 6 caracteres',
    };
  }
  return null;
};

module.exports = (req, _res, next) => {
  const { email, password } = req.body;
  const validationError = validateEmail(email)
    || validatePassword(password);
  next(validationError);
};