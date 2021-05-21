const validateEmail = (email, next) => {
  if (!email || email.length === 0) {
    return next({
      status: 400,
      message: 'O campo "email" é obrigatório',
    });
  }
  const regex = /[a-zA-Z0-9._+-]{1,30}@[a-zA-Z0-9._+-]{1,10}\.com/;
  if (!email.match(regex)) {
    return next({
      status: 400,
      message: 'O "email" deve ter o formato "email@email.com"',
    });
  }
};

const validatePassword = (password, next) => {
  if (!password) {
    return next({
      status: 400,
      message: 'O campo "password" é obrigatório',
    });
  }
  if (password.length < 6) {
    return next({
      status: 400,
      message: 'O "password" deve ter pelo menos 6 caracteres',
    });
  }
};

module.exports = (req, _res, next) => {
  const { email, password } = req.body;
  validateEmail(email, next);
  validatePassword(password, next);
  next();
};