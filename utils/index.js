const crypto = require('crypto');

const login = (req, res) => {
  const { email } = req.body;
  const { password } = req.body;
  const re = /.+@[A-z]+[.]com/;
  const isValidEmail = re.test(email);
  if (!email) {
   return res.status(400).send({ message: 'O campo `"email"` é obrigatório' });
  }
  if (!isValidEmail) {
    return res.status(400).send(
      { message: 'O `"email"` deve ter o formato `"email@email.com"`' },
);
  }
 if (!password) { return res.status(400).send({ message: 'O campo `"password"` é obrigatório' }); }
  if (password.length < 6) {
    return res.status(400).send({ message: 'O `"password"` deve ter pelo menos 6 caracteres' });
 }
  res.status(200).json({ token: crypto.randomBytes(8).toString('hex') });
};

module.exports = { login };
