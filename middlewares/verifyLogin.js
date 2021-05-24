// reference: https://www.horadecodar.com.br/2020/09/13/como-validar-email-com-javascript/
function validateEmail(email) {
  const re = /\S+@\S+\.\S+/;
  return re.test(email);
}

// Reference: https://www.ti-enxame.com/pt/javascript/gere-stringcaracteres-aleatorios-em-javascript/967048592/
function getToken() {
  let text = '';
  const possible = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
  for (let index = 0; index < 16; index += 1) {
    text += possible.charAt(Math.floor(Math.random() * possible.length));
  }
  return text;
}

const verifyLogin = (req, res) => {
  const { email, password } = req.body;
  if (!email) return res.status(400).send({ message: 'O campo "email" é obrigatório' });
  if (!validateEmail(email)) {
    return res.status(400).send({ message: 'O "email" deve ter o formato "email@email.com"' });
  }
  if (!password) return res.status(400).send({ message: 'O campo "password" é obrigatório' });
  if (password.toString().length < 6) {
    return res.status(400).send({ message: 'O "password" deve ter pelo menos 6 caracteres' });
  }
  const token = getToken();
  res.status(200).send({ token });
};

module.exports = verifyLogin;
