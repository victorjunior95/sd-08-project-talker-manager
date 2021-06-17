const validateLogin = async (req, res, next) => {
  const { email, password } = req.body;
  const regexEmail = () => {
    const validation = /\S+@\S+\.\S+/;
    return validation.test(String(email).toLowerCase());
  };
  const isAnEmail = regexEmail();
  if (!email) return res.status(400).json({ message: 'O campo "email" é obrigatório' });
  if (!isAnEmail) {
    return res.status(400).json({ message: 'O "email" deve ter o formato "email@email.com"' });
  }
  if (!password) return res.status(400).json({ message: 'O campo "password" é obrigatório' });
  if (password.length < 6) {
    return res.status(400).json({ message: 'O "password" deve ter pelo menos 6 caracteres' });
  }
  next();
};

module.exports = validateLogin;
