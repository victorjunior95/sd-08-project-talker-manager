module.exports = (req, _res, next) => {
  const { body: { email, password } } = req;
  if (!email) return next({ status: 400, message: 'O campo "email" é obrigatório' });
  if (!password) return next({ status: 400, message: 'O campo "password" é obrigatório' });

  const emailRegex = /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/g;
  if (!emailRegex.test(email)) {
    return next({ status: 400, message: 'O "email" deve ter o formato "email@email.com"' });
  }

  const pwdRegex = /^[\d\w]{6,}$/g;
  if (!pwdRegex.test(password)) {
    return next({ status: 400, message: 'O "password" deve ter pelo menos 6 caracteres' });
  }
  
  next();
};
