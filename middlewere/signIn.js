const crypto = require('crypto');

const verifyEmail = (email) => {
  const isValid = RegExp(/.+@[A-z]+[.]com/).test(email);
  if (email) {
    if (!isValid) {
      return {
        message: 'O "email" deve ter o formato "email@email.com"',
        isValid,
      };
    }
    return {
      message: '',
      isValid,
    };
  }
  return {
    message: 'O campo "email" é obrigatório',
    isValid,
  };
};

const verifyPassword = (password) => {
  const isValid = password && password.toString().length >= 6;
  if (password) {
    if (!isValid) {
      return {
        message: 'O "password" deve ter pelo menos 6 caracteres',
        isValid,
      };
    }
    return {
      message: '',
      isValid,
    };
  }
  return {
    message: 'O campo "password" é obrigatório',
    isValid,
  };
};

module.exports = (req, res, _next) => {
  const { email, password } = req.body;
  const isEmail = verifyEmail(email);
  const isPassword = verifyPassword(password);
  if (!isEmail.isValid) return res.status(400).json({ message: isEmail.message }); 
  if (!isPassword.isValid) return res.status(400).json({ message: isPassword.message });
  return res.status(200).json({ token: crypto.randomBytes(8).toString('hex') });
};
