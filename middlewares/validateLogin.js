const verifyEmail = (email) => {
    const emailRegex = /^[a-z0-9.]+@[a-z0-9]+\.[a-z]+$/;
    return emailRegex.test(email);
};

const validateEmail = async (req, res, next) => {
  const { email } = req.body;

  if (email === '' || !email) { 
    return res.status(400)
      .json({ message: 'O campo "email" é obrigatório' });
  }

  if (verifyEmail(email) === false) { 
    return res.status(400)
      .json({ message: 'O "email" deve ter o formato "email@email.com"' });
  }

  return next();
};

const verifyPassword = (password) => {
  const passwordRegex = /^[a-zA-Z0-9]{6,}$/;
  return passwordRegex.test(password);
};

const validatePassword = async (req, res, next) => {
  const { password } = req.body;

  if (password === '' || !password) {
    return res.status(400)
      .json({ message: 'O campo "password" é obrigatório' });
  }

  if (verifyPassword(password) === false) {
    return res.status(400)
      .json({ message: 'O "password" deve ter pelo menos 6 caracteres' });
  }

  return next();
};

module.exports = {
  validateEmail,
  validatePassword,
};
