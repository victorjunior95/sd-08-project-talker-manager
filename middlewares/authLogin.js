module.exports = (req, res, next) => {
  const { email, password } = req.body;
  const regexEmail = /^[a-z0-9.]+@[a-z0-9]+\.[a-z]+(\.[a-z]+)?$/i;
  const emailIsValid = regexEmail.test(email);

  if (!email) {
    res.status(400).json({ message: 'O campo "email" é obrigatório' });
  }
  if (!password) {
    res.status(400).json({ message: 'O campo "password" é obrigatório' });
  }
  if (!emailIsValid) {
    res.status(400).json({ message: 'O "email" deve ter o formato "email@email.com"' });
  }
  if (password.toString().length < 6) {
    res.status(400).json({ message: 'O "password" deve ter pelo menos 6 caracteres' });
  }
  next();
};