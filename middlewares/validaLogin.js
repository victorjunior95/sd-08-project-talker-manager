// https://www.horadecodar.com.br/2020/09/13/como-validar-email-com-javascript/
function validateEmail(email) {
  const re = /\S+@\S+\.\S+/;
  return re.test(email);
}

// https://www.webtutorial.com.br/funcao-para-gerar-uma-string-aleatoria-random-com-caracteres-especificos-em-javascript/
function geraToken() {
  let token = '';
  const caracteres = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
  for (let index = 0; index < 16; index += 1) {
    token += caracteres.charAt(Math.floor(Math.random() * caracteres.length));
  }
  return token;
}

const validaLogin = (req, res) => {
  const { email, password } = req.body;
  if (!email) {
    return res.status(400).send({ message: 'O campo "email" é obrigatório' });
  } 
  if (!validateEmail(email)) {
    return res.status(400).send({ message: 'O "email" deve ter o formato "email@email.com"' });
  }
  console.log('Passei');
  if (!password) return res.status(400).send({ message: 'O campo "password" é obrigatório' });
  if (password.toString().length < 6) {
    return res.status(400).send({ message: 'O "password" deve ter pelo menos 6 caracteres' });
  }
  const token = geraToken();
  res.status(200).send({ token });
};

module.exports = validaLogin;
