module.exports = (request, response, next) => {
  const { email } = request.body;
  const emailRegex = /.+@[A-z]+[.]com/;
  const isEmailValid = emailRegex.test(email);
  if (!email) return response.status(400).json({ message: 'O campo "email" é obrigatório' });
  if (!isEmailValid) {
    return response.status(400)
    .json({ message: 'O "email" deve ter o formato "email@email.com"' });
  }
  next();
};
