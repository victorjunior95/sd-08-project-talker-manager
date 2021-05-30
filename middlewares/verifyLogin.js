function verifyEmail(email) {
  const filter = /\S+@\S+\.\S+/;
  return filter.test(email);
}

function generateToken() {
  const result = [];
  const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
  const charactersLength = characters.length;
  for (let i = 0; i < 16; i += 1) {
    result.push(characters.charAt(Math.floor(Math.random() * charactersLength)));
  }
  return result.join('');
}

module.exports = (req, res) => {
  const { email, password } = req.body;
  if (email === undefined) {
    return res.status(400).send({ message: 'O campo "email" é obrigatório' });
  }
  if (verifyEmail(email) === false) {
    return res.status(400).send({ message: 'O "email" deve ter o formato "email@email.com"' });
  }
  if (password === undefined) {
    return res.status(400).send({ message: 'O campo "password" é obrigatório' });
  }
  if (password.toString().length < 6) {
    return res.status(400).send({ message: 'O "password" deve ter pelo menos 6 caracteres' });
  }
  const tokenCode = generateToken();
  res.status(200).send({ token: tokenCode });
};
