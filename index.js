const express = require('express');
const bodyParser = require('body-parser');
const fs = require('fs');
const {
  readFile,
  generateToken,
  emailValidation,
  passwordValidation,
  tokenValidation,
  nameValidation,
  ageValidation,
  dateValidation,
  talkValidationExists,
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
      return res.status(200).send(getTalker);
    })
    .catch(() => res.status(404).send({ message: 'Pessoa palestrante não encontrada' }));
});

app.post('/login', (req, res) => {
  const token = generateToken();
  const { email, password } = req.body;
  const emailValidated = emailValidation(email);
  const passwordValidated = passwordValidation(password);
  if (!emailValidated.validation) {
    return res.status(400).send({ message: emailValidated.message });
  }

  if (!passwordValidated.validation) {
    return res.status(400).send({ message: passwordValidated.message });
  }

  res.status(200).send(token);
});

app.post(
  '/talker',
  tokenValidation,
  nameValidation,
  ageValidation,
  talkValidationExists,
  dateValidation,
  (req, res) => {
    const { name, age, talk } = req.body;
    readFile(talkerPath)
      .then((data) => {
        const id = data.length + 1;
        const newTalker = { id, name, age, talk };
        data.push(newTalker);
        const newData = JSON.stringify(data);
        fs.writeFile(talkerPath, newData, (err) => {
          if (err) res.status(404).send('Palestrante não adicionado');
        });
        res.status(201).send(newTalker);
      })
      .catch(() => res.status(200).send());
  },
);

app.put(
  '/talker/:id',
  tokenValidation,
  nameValidation,
  ageValidation,
  talkValidationExists,
  dateValidation,
  (req, res) => {
    const idInt = parseInt(req.params.id, 10);
    const { name, age, talk } = req.body;
    const newTalker = { id: idInt, name, age, talk };
    readFile(talkerPath)
      .then((data) => {
        const talkers = data.map((talker) => {
          if (talker.id === idInt) {
            return { ...newTalker };
          }
        return talker;
        });
        const newData = JSON.stringify(talkers);
        fs.writeFile(talkerPath, newData, (err) => {
          if (err) res.status(404).send('Palestrante não editado');
        });
        res.status(200).send(newTalker);
      })
      .catch(() => res.status(200).send());
  },
);

app.listen(PORT, () => {
  console.log('Online');
});
