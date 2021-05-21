const randomToken = '7mqaVRXJSp886CGr';
const nimOfPassword = 6;

const messages = {
  emailRequire: 'O campo "email" é obrigatório',
  emailIncorrect: 'O "email" deve ter o formato "email@email.com"',
  passwordRequire: 'O campo "password" é obrigatório',
  passwordIncorrect: 'O "password" deve ter pelo menos 6 caracteres',
};

console.log(messages.passwordIncorrect);

const emailValidation = (email) => {
  const validEmail = /^[\w-.]+@([\w-]+\.)+[\w-]{2,4}$/g;
  return validEmail.test(email);
};

module.exports = (req, res, _next) => {
  const { email, password } = req.body;
  // console.log(email, typeof(password), password.toString().length);
  if (email === undefined) return res.status(400).json({ message: messages.emailRequire });
  if (!emailValidation(email)) return res.status(400).json({ message: messages.emailIncorrect });
  if (password === undefined) return res.status(400).json({ message: messages.passwordRequire });
  if (password.toString().length < nimOfPassword) {
    return res.status(400).json({ message: messages.passwordIncorrect });
  }
  res.json({ token: randomToken });
};
