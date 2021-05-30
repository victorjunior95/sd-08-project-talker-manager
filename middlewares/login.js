const token = () => {
  const chars = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ1234567890'.split('');
  const tokenToJoin = [];
  const LENGTH = 16;

  for (let i = 0; i < LENGTH; i += 1) {
    tokenToJoin.push(chars[(Math.random() * (chars.length - 1)).toFixed(0)]);
  }
  return tokenToJoin.join('');
};

const login = (req, res) => {
  const { email, password } = req.body;
  if (!email) {
    return res.status(400).send({ message: 'O campo "email" é obrigatório' });
  }
  if (!password) {
    return res.status(400).send({ message: 'O campo "password" é obrigatório' });
  }
  if (password.length < 6) {
    return res.status(400).send({ message: 'O "password" deve ter pelo menos 6 caracteres' }); 
  }

  const regexTo = /[^@]+@[^]+\..+/g;
  const testEmail = regexTo.test(email);

  return (testEmail)
    ? res.status(200).json({ token: token() })
    : res.status(400).send({ message: 'O "email" deve ter o formato "email@email.com"' }); 
};

// Regex validator available on https://www.regextester.com/99632
// Token Generator available on https://www.codegrepper.com/code-examples/javascript/javascript+token+generator

module.exports = login;
