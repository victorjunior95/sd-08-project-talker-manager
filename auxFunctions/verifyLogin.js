function validateEmail(emailAdress) {
  const regexEmail = /\S+@\S+\.\S+/;
  if (emailAdress.match(regexEmail)) {
    return true;
  }
  return false;
}

const generateToken = (length) => {
  let result = '';
  const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
  const charactersLength = characters.length;
  for (let index = 0; index < length; index += 1) {
    result += characters.charAt(Math.floor(Math.random() * charactersLength));
  }
  return result;
};

const numberToComper = 6;
const verifyLogin = (req, res) => {
  const { email, password } = req.body;
  if (!email) {
    return res.status(400).json({ message: 'O campo "email" é obrigatório' });
  } if (!validateEmail(email)) {
    return res
      .status(400)
      .json({ message: 'O "email" deve ter o formato "email@email.com"' });
  } if (!password) {
    return res
      .status(400)
      .json({ message: 'O campo "password" é obrigatório' });
  } if (password.length < numberToComper) {
    return res
      .status(400)
      .json({ message: 'O "password" deve ter pelo menos 6 caracteres' });
  }
  res.status(200).json({ token: generateToken(16) });
};

module.exports = verifyLogin;
