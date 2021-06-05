const regexEmail = (email) => {
  // https://stackoverflow.com/questions/46155/how-to-validate-an-email-address-in-javascript
  const validationEmailRegex = /\S+@\S+\.\S+/;
  return validationEmailRegex.test(String(email).toLowerCase());
};

const emailMiddleware = async (req, res, next) => {
  const { email } = req.body;
  const isValid = regexEmail(email);

  if (!email) {
    return res.status(400).json({ message: 'O campo "email" é obrigatório' });
  }
  if (!isValid) {
    return res.status(400).json({ message: 'O "email" deve ter o formato "email@email.com"' });
  }
  return next();
};

module.exports = emailMiddleware;
