const express = require('express');
const bodyParser = require('body-parser');
const {
  readFile,
  generateToken,
  emailValidation,
  passwordValidation,
} = require('./midlewares');

const app = express();
app.use(bodyParser.json());

const HTTP_OK_STATUS = 200;
const PORT = '3000';
const talkerPath = './talker.json';

// não remova esse endpoint, e para o avaliador funcionar
app.get('/', (_request, response) => {
  response.status(HTTP_OK_STATUS).send();
});

app.get('/talker', (_req, res) => {
  readFile(talkerPath)
    .then((data) => res.status(200).send(data))
    .catch(() => res.status(200).send([]));
});

app.get('/talker/:id', (req, res) => {
  const { id } = req.params;
  readFile(talkerPath)
    .then((data) => {
      const getTalker = data.find((talker) => talker.id === parseInt(id, 10));
      if (!getTalker) res.status(404).send({ message: 'Pessoa palestrante não encontrada' });
      res.status(200).send(getTalker);
    })
    .catch(() => res.status(404).send({ message: 'Pessoa palestrante não encontrada' }));
});

app.post('/login', (req, res) => {
  const token = generateToken();
  const { email, password } = req.body;
  const emailValidated = emailValidation(email);
  const passwordValidated = passwordValidation(password);
  if (!emailValidated.validation) {
    res.status(400).send({ message: emailValidated.message });
  }

  if (!passwordValidated.validation) {
    res.status(400).send({ message: passwordValidated.message });
  }

  res.status(200).send(token);
});

app.listen(PORT, () => {
  console.log('Online');
});
